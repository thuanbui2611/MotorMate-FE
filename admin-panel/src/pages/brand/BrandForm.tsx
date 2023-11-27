import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Brand } from "../../app/models/Brand";
import { useForm, FieldValues, set } from "react-hook-form";
import { useAppDispatch } from "../../app/store/ConfigureStore";
import AppTextInput from "../../app/components/AppTextInput";
import { useEffect, useRef, useState } from "react";
import { addBrandAsync, updateBrandAsync } from "./BrandSlice";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

import { deleteImage, uploadImage } from "../../app/utils/Cloudinary";
interface Props {
  brand: Brand | null;
  cancelEdit: () => void;
  actionName: string;
}

export default function BrandForm({ brand, cancelEdit, actionName }: Props) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "all",
  });
  const [imageUploaded, setImageUploaded] = useState<File | null>();
  const [imageReview, setImageReview] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const [deleteCurrentImage, setDeleteCurrentImage] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (brand) reset(brand);
  }, [brand, reset]);

  const dispatch = useAppDispatch();

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
      setDeleteCurrentImage(false);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function submitForm(data: FieldValues) {
    try {
      const formData = {
        id: brand?.id,
        name: data.name,
        imageUrl: brand?.image.image || null,
        publicId: brand?.image.publicId || null,
      };
      if (imageUploaded) {
        let getImage = await uploadImage(imageUploaded);
        if (getImage) {
          formData.imageUrl = getImage.image;
          formData.publicId = getImage.publicId;
        }
      }
      if (deleteCurrentImage) {
        formData.imageUrl = null;
        formData.publicId = null;
      }
      if (brand) {
        if (imageUploaded || deleteCurrentImage) {
          await deleteImage(brand.image.publicId);
        }
        await dispatch(updateBrandAsync(formData));
      } else {
        await dispatch(addBrandAsync(formData));
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
  return (
    <>
      <Dialog
        size="xs"
        open={true}
        handler={cancelEdit}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader className="text-center">
            <Typography
              variant="h3"
              className="text-center py-4 bg-orange-500 text-white rounded-sm dark:bg-boxdark dark:text-white"
            >
              {actionName}
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit(submitForm)}>
            <CardBody className="flex flex-col gap-4 overflow-y-auto max-h-[600px]">
              <AppTextInput control={control} name="name" label="Brand name" />
              <label className="block mb-2 text-sm font-semibold text-black">
                Logo:
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
                //Upload image
                <>
                  <div className="mb-8">
                    <input
                      type="file"
                      name="logo"
                      id="file"
                      className="sr-only"
                      onChange={handleImageChange}
                      accept="image/*"
                      ref={fileInputRef}
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
                </>
              )}

              {brand?.image && !deleteCurrentImage && !imageReview && (
                <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                  <div className="flex items-center justify-between">
                    <span className="truncate pr-3 text-base font-medium text-[#07074D]"></span>
                    <button
                      className="text-[#07074D]"
                      onClick={() => {
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
                    src={brand.image.image}
                    alt="Logo brand preview"
                  />
                </div>
              )}
            </CardBody>
            <CardFooter className="pt-0 flex flex-row justify-between gap-10">
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
