import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import {
  addCommentAsync,
  blogCommentSelectors,
  getBlogCommentsAsync,
  setBlogCommentParams,
} from "./BlogCommentSlice";
import { useEffect } from "react";
import LoaderButton from "../../app/components/LoaderButton";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
interface Props {
  blogId: string | undefined;
}
export default function BlogCommentPage({ blogId }: Props) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    mode: "all",
  });

  const { blogCommentLoaded, blogCommentParams, metaData } = useAppSelector(
    (state) => state.blogComment
  );
  const userLogin = useAppSelector((state) => state.account.userDetail);

  const dispatch = useAppDispatch();

  if (!blogId) return null;
  const blogComments = useAppSelector((state) =>
    blogCommentSelectors.selectById(state, blogId)
  );

  useEffect(() => {
    if (blogCommentLoaded || !blogId) return;
    if (blogComments && blogComments.comments[0].blogId !== blogId) {
      dispatch(getBlogCommentsAsync(blogId));
    } else if (!blogComments) {
      dispatch(getBlogCommentsAsync(blogId));
    }
  }, [blogCommentParams, dispatch, blogId]);

  async function onCreateComment(data: FieldValues) {
    const formData = {
      blogId: blogId,
      userId: userLogin?.id,
      comment: data.comment,
    };
    await dispatch(addCommentAsync(formData));
    setValue("comment", "");
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(onCreateComment)();
    }
  };
  return !metaData ? (
    <div className="flex items-center justify-center h-32">
      <LoaderButton />
    </div>
  ) : (
    <>
      <div className="py-12 flex justify-center items-center">
        <div className="flex flex-col justify-start items-start w-full space-y-8">
          <div className="flex justify-start items-start">
            <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 ">
              Comments ({blogComments?.countTotalComments})
            </p>
          </div>
          {/* comment form  */}
          <div className="w-full flex justify-start items-start">
            <div>
              <img
                src={
                  userLogin
                    ? userLogin?.image.imageUrl
                    : require("../../app/assets/images/icon/user.png")
                }
                alt="user-avatar"
                className="w-12 h-12 rounded-full shadow-md"
              />
            </div>
            <div className="w-full flex justify-start items-start flex-col  bg-gray-200/50 ml-2 rounded-2xl p-4">
              <form
                className="flex items-center justify-center w-full"
                onSubmit={handleSubmit(onCreateComment)}
              >
                <AppTextInput
                  control={control}
                  onKeyDown={handleKeyDown}
                  disabled={userLogin ? false : true}
                  className="w-full px-4 py-3 bg-transparent rounded-lg border-none"
                  multiline
                  sx={{
                    border: "none",
                    "& .Mui-disabled": {
                      "-webkit-text-fill-color": "black",
                    },
                    "& .MuiOutlinedInput-input": {
                      boxShadow: "none",
                    },
                    "& fieldset": { border: "none" },
                  }}
                  placeholder={
                    userLogin ? "Write your comment" : "Please login to comment"
                  }
                  maxRows={3}
                  {...register("comment", {
                    required: "Please enter your comment.",
                    pattern: {
                      value:
                        /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i,
                      message: "Invalid comment",
                    },
                  })}
                />

                <button
                  className={`flex ml-3 text-white justify-center items-center h-8 w-8 rounded-full ${
                    userLogin && "hover:brightness-90"
                  } ${
                    isSubmitting
                      ? "bg-transparent"
                      : " bg-gradient-to-r from-[#FF6003] to-[#FF7E06]"
                  }`}
                  disabled={isSubmitting || userLogin ? false : true}
                  type="submit"
                >
                  {isSubmitting ? (
                    <LoaderButton />
                  ) : (
                    <span className="flex relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
          {/* Comment Start */}
          {blogComments &&
            blogComments.comments.map((comment) => (
              <div className="w-full flex justify-start items-start flex-col">
                <div className="flex mx-10 w-[92%]">
                  <div>
                    <img
                      src={
                        comment.avatar
                          ? comment.avatar
                          : require("../../app/assets/images/icon/user.png")
                      }
                      alt="user-avatar"
                      className="w-12 h-12 rounded-full shadow-md"
                    />
                  </div>
                  <div className="w-full flex justify-start items-start flex-col bg-gray-200/50 ml-2 rounded-2xl p-4">
                    <div className="flex w-full justify-between items-start">
                      <p className="text-base leading-none text-black font-bold">
                        {comment.username}
                      </p>
                      <p className="text-sm leading-none text-black ">
                        {new Date(comment.createdAt).toLocaleString([], {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="md:block">
                      <p className="mt-3 text-xs md:text-sm font-medium text-black w-full">
                        {comment.Comment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* Review End */}
          <>
            {blogComments &&
            blogComments.comments.length > 0 &&
            metaData.totalItemCount > blogComments.comments.length ? (
              <div
                className="mx-auto w-24 h-7 text-blue-500 hover:text-blue-700 cursor-pointer text-sm lg:text-base border border-blue-500 rounded-xl px-2 hover:bg-blue-400"
                onClick={() => {
                  dispatch(
                    setBlogCommentParams({
                      pageSize: blogCommentParams.pageSize + 5,
                    })
                  );
                  dispatch(getBlogCommentsAsync(blogId));
                }}
              >
                {blogCommentLoaded ? <LoaderButton /> : "See more"}
              </div>
            ) : (
              <></>
            )}
          </>
        </div>
      </div>
    </>
  );
}
