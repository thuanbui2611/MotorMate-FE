import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useForm, FieldValues, set } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import AppTextInput from "../../app/components/AppTextInput";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Autocomplete, LoadingButton } from "@mui/lab";

import { deleteImage, uploadImage } from "../../app/utils/Cloudinary";
import { Author, Blog } from "../../app/models/Blog";
import { addBlogAsync, updateBlogAsync } from "./BlogSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import agent from "../../app/api/agent";
import LoaderButton from "../../app/components/LoaderButton";
import { Box, TextField } from "@mui/material";
import { Category } from "../../app/models/Category";
import { UserDetail } from "../../app/models/User";
import { getUsersAsync } from "../filter/FilterSlice";
import {
  blogCategorySelectors,
  getBlogCategoriesAsync,
} from "../blogCategory/BlogCategorySlice";
interface Props {
  blog: Blog | null;
  cancelEdit: () => void;
  actionName: string;
}

export default function BlogForm({ blog, cancelEdit, actionName }: Props) {
  const [imageUploaded, setImageUploaded] = useState<File | null>();
  const [imageReview, setImageReview] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const [deleteCurrentImage, setDeleteCurrentImage] = useState<boolean>(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [content, setContent] = useState<string>("");

  const [selectedCategories, setSelectedCategories] = useState<Category | null>(
    null
  );

  const { users, usersLoading } = useAppSelector((state) => state.filter);
  const { blogCategoryLoaded } = useAppSelector((state) => state.blogCategory);
  const categories = useAppSelector(blogCategorySelectors.selectAll);
  const dispatch = useAppDispatch();
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (blog) {
      reset(blog);
      setContent(blog.content);
      setSelectedAuthor(blog.author);
      const selectedCategory: Category = {
        id: blog.category.categoryId,
        name: blog.category.name,
      };
      setSelectedCategories(selectedCategory);
    }
  }, [blog, reset]);
  useEffect(() => {
    //fetch all categories
    if (categories.length === 0 && !blogCategoryLoaded) {
      dispatch(getBlogCategoriesAsync());
    }
    //fetch all users
    if (users.length === 0 && !usersLoading) {
      dispatch(getUsersAsync()).then((response) => {
        const users = response.payload as UserDetail[];
        const authors: Author[] = users.map((user) => ({
          authorId: user.id,
          username: user.username,
          picture: user.image.imageUrl,
        }));

        setAuthors(authors);
      });
    }
  }, []);

  const handleAuthorChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: Author | null
  ) => {
    if (newValue) {
      setSelectedAuthor(newValue);
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Accept only image file");
    } else {
      setImageUploaded(file);
      setImageReview({
        name: file.name,
        url: URL.createObjectURL(file),
      });
      setDeleteCurrentImage(true);
    }
  };

  async function submitForm(data: FieldValues) {
    try {
      const formData = {
        id: blog?.id,
        title: data.title,
        content: content,
        shortDescription: data.shortDescription,
        imageUrl: blog?.image.imageUrl || null,
        publicId: blog?.image.publicId || null,
        authorId: selectedAuthor?.authorId,
        categoryId: selectedCategories?.id,
      };

      if (deleteCurrentImage) {
        formData.imageUrl = null;
        formData.publicId = null;
      }
      if (imageUploaded) {
        let getImage = await uploadImage(imageUploaded as any);
        if (getImage) {
          formData.imageUrl = getImage.image;
          formData.publicId = getImage.publicId;
        }
      }

      console.log("Form data:", formData);

      if (blog) {
        if (imageUploaded || deleteCurrentImage) {
          await deleteImage(blog.image.publicId);
        }
        await dispatch(updateBlogAsync(formData));
      } else {
        await dispatch(addBlogAsync(formData));
      }
      setImageReview(null);
      cancelEdit();
    } catch (error: any) {
      toast.error("Error: " + error.message);
    }
  }

  const onClose = () => {
    setImageReview(null);
    cancelEdit();
  };

  //ReactQuill
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        [{ script: "super" }, { script: "sub" }],
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["direction", { align: [] }],
      ["link", "image", "video", "formula"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  return (
    <>
      <Dialog
        size="lg"
        open={true}
        handler={cancelEdit}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[50rem]">
          <CardHeader className="text-center">
            <Typography
              variant="h3"
              className="text-center py-4 bg-orange-500 text-white rounded-sm dark:bg-boxdark dark:text-blue-gray-50"
            >
              {actionName}
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit(submitForm)}>
            <CardBody className="flex flex-col gap-4 overflow-y-auto max-h-[600px]">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-1 flex flex-col">
                  <label className="block mb-2 text-sm font-semibold text-black">
                    Author:
                  </label>
                  {usersLoading ? (
                    <LoaderButton />
                  ) : (
                    <Autocomplete
                      size="small"
                      disablePortal
                      value={selectedAuthor}
                      options={authors}
                      getOptionLabel={(option) => option.username}
                      onChange={(event, newValue) =>
                        handleAuthorChange(event, newValue)
                      }
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <div className="flex items-center justify-start">
                            <div className="h-12 w-12 rounded-md mr-2">
                              <img
                                className="h-full w-full rounded-md object-cover"
                                src={
                                  option.picture
                                    ? option.picture
                                    : require("../../app/assets/images/icon/user.png")
                                }
                                alt="Avatar"
                              />
                            </div>
                            {option.username}
                          </div>
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <>
                                {selectedAuthor && (
                                  <img
                                    className="h-6 w-6 rounded-full"
                                    src={
                                      selectedAuthor.picture
                                        ? selectedAuthor.picture
                                        : require("../../app/assets/images/icon/user.png")
                                    }
                                    alt="Avatar"
                                    referrerPolicy="no-referrer"
                                  />
                                )}
                                {params.InputProps.startAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                  )}
                </div>
              </div>
              <AppTextInput
                control={control}
                label="Blog title"
                {...register("title", {
                  required: "You need to provide a title for this blog",
                  pattern: {
                    value:
                      /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i,
                    message: "Invalid title",
                  },
                })}
              />
              {blogCategoryLoaded ? (
                <LoaderButton />
              ) : (
                <Autocomplete
                  fullWidth={true}
                  disablePortal
                  size="small"
                  value={selectedCategories}
                  options={categories}
                  getOptionLabel={(category) => category.name}
                  onChange={(event, newValue) =>
                    setSelectedCategories(newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      InputProps={{
                        ...params.InputProps,
                      }}
                      required
                    />
                  )}
                />
              )}

              <AppTextInput
                control={control}
                label="Short Description"
                multiline={true}
                rows={4}
                {...register("shortDescription", {
                  required:
                    "You need to provide a short description for this blog",
                  pattern: {
                    value:
                      /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i,
                    message: "Invalid short description",
                  },
                })}
              />

              <label className="block text-sm font-semibold text-black">
                Image:
              </label>

              {imageReview ? (
                <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                  <div className="flex items-center justify-between">
                    <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                      {imageReview.name}
                    </span>
                    <button
                      className="text-[#07074D]"
                      onClick={() => {
                        setImageReview(null);
                        setImageUploaded(null);
                        setDeleteCurrentImage(true);
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>

                  <img
                    className="pt-3"
                    src={imageReview.url}
                    alt="Logo brand preview"
                  />
                </div>
              ) : (
                //upload image
                <>
                  {!imageReview && !blog?.image && !imageUploaded ? (
                    <div className="mb-8">
                      <input
                        type="file"
                        name="logo"
                        id="file"
                        className="sr-only"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                      <label
                        htmlFor="file"
                        className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center hover:bg-graydark/5"
                      >
                        <div>
                          <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                            Drop image here
                          </span>
                          <span className="mb-2 block text-base font-medium text-[#6B7280]">
                            Or
                          </span>
                          <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                            Browse
                          </span>
                        </div>
                      </label>
                    </div>
                  ) : (
                    <>
                      {deleteCurrentImage && (
                        <div className="mb-8">
                          <input
                            type="file"
                            name="logo"
                            id="file"
                            className="sr-only"
                            onChange={handleImageChange}
                            accept="image/*"
                          />
                          <label
                            htmlFor="file"
                            className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center hover:bg-graydark/5"
                          >
                            <div>
                              <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                Drop image here
                              </span>
                              <span className="mb-2 block text-base font-medium text-[#6B7280]">
                                Or
                              </span>
                              <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                Browse
                              </span>
                            </div>
                          </label>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              {blog?.image &&
              !imageUploaded &&
              !deleteCurrentImage &&
              !imageReview ? (
                <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                  <div className="flex items-center justify-between">
                    <span className="truncate pr-3 text-base font-medium text-[#07074D]"></span>
                    <button
                      className="text-[#07074D]"
                      onClick={() => {
                        setImageUploaded(null);
                        setDeleteCurrentImage(true);
                        setImageReview(null);
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>

                  <img
                    className="pt-3"
                    src={blog.image.imageUrl}
                    alt="Blog image preview"
                  />
                </div>
              ) : (
                <></>
              )}
              <label className="block text-sm font-semibold text-black">
                Content:
              </label>
              <ReactQuill
                className=" pb-16"
                value={content}
                onChange={(data) => setContent(data)}
                theme="snow"
                modules={modules}
                placeholder="Enter content here"
                style={{ height: 500 }}
              />
            </CardBody>
            <CardFooter className="pt-0 flex flex-row justify-center gap-10">
              <LoadingButton
                className="bg-gradient-to-tr from-light-blue-600 to-light-blue-400 text-white shadow-md shadow-light-blue-500/20 hover:shadow-lg hover:shadow-light-blue-500/40 active:opacity-[0.85]"
                loading={isSubmitting}
                type="submit"
                variant="contained"
                color="success"
              >
                <span className="font-bold">Confirm</span>
              </LoadingButton>
              <Button
                variant="gradient"
                color="red"
                size="lg"
                onClick={onClose}
              >
                Cancel
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
}
