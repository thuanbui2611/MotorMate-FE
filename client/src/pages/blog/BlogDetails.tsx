import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { Blog } from "../../app/models/Blog";
import Loading from "../../app/components/Loading";
import parse from "html-react-parser";
import NotFound from "../../app/errors/NotFound";
import BlogComment from "./BlogComment";
import { ConvertToDateTimeStr } from "../../app/utils/ConvertDatetimeToStr";
import RelatedBlogs from "./RelatedBlogs";
import { scrollToTop } from "../../app/utils/ScrollToTop";
import { useAppSelector } from "../../app/store/ConfigureStore";
import { blogSelectors } from "./BlogSlice";

export default function BlogDetails() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const blogDetails = useAppSelector((state) =>
    blogSelectors.selectById(state, id!)
  );

  useEffect(() => {
    if (blogDetails) {
      setBlog(blogDetails);
      setLoading(false);
      scrollToTop();
    }
  }, [blogDetails]);

  useEffect(() => {
    if (!id && loading) return;
    if (blogDetails && blogDetails.id !== id) {
      setLoading(true);
      agent.Blog.details(id!)
        .then((blog) => {
          setBlog(blog);
          setLoading(false);
          scrollToTop();
        })
        .catch((error) => console.log(error));
    } else if (!blogDetails) {
      setLoading(true);
      agent.Blog.details(id!)
        .then((blog) => {
          setBlog(blog);
          setLoading(false);
          scrollToTop();
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  return loading ? (
    <Loading />
  ) : !blog ? (
    <NotFound />
  ) : (
    <>
      <div>
        <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 block -z-10">
          <span className="absolute right-4 top-40 w-24 h-24 rounded-3xl bg-orange-based blur-xl opacity-40"></span>
          <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-orange-based blur-xl opacity-30 block"></span>
        </div>
        <span className="-z-10 w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-[#FF6003] to-[#FF7E06] absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
        <div className=" px-5 md:px-10 py-6 mx-auto">
          <div className="max-w-screen-2xl px-2 md:px-10 py-6 mx-auto rounded-md">
            <div className="flex items-center justify-between mt-4 mb-4 gap-4">
              <a
                href="#"
                className="px-2 py-1 font-bold bg-gradient-to-r from-[#FF6003] to-[#FF7E06] text-white rounded-lg hover:bg-red-800"
              >
                {blog?.category.name}
              </a>
              <p className="text-sm font-medium bg-gray-200 rounded-full py-1 px-2">
                {ConvertToDateTimeStr(blog?.createdAt!)}
              </p>
            </div>
            <div className="mt-2 flex items-center justify-center">
              <div className="sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-orange-based">
                {blog?.title}
              </div>

              {/* <div className="font-light text-gray-600">
                <a href="#" className="flex items-center mt-6 mb-6">
                  <img
                    src="https://avatars.githubusercontent.com/u/71964085?v=4"
                    alt="avatar"
                    className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
                  />
                  <h1 className="font-bold text-gray-700 hover:underline">
                    By James Amos
                  </h1>
                </a>
              </div> */}
            </div>

            <div className="flex-col items-center justify-center w-full px-2 md:px-10 mx-auto text-2xl text-gray-700 mt-4 rounded-lg bg-gray-50">
              <div>
                <p className="mt-2 p-4 font-medium md:p-8 text-xs md:text-xl">
                  {blog?.shortDescription}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="object-cover shadow-sm rounded-md  w-[70%] h-[70%]"
                  src={blog?.image.imageUrl}
                />
              </div>
              <div>
                <div className="mt-2 p-4 font-normal md:p-8 text-xs md:text-xl blogContentContainer">
                  {parse(blog?.content || "")}
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-2xl mt-4 text-gray-500 font-bold text-center">
            Related Posts
          </h2>
          {blog && (
            <div className="max-w-7xl mx-auto px-5 mb-3">
              <RelatedBlogs blogId={blog.id} />
            </div>
          )}
          {blog && (
            <div className=" max-w-5xl py-16 xl:px-8 flex flex-col justify-center mx-auto">
              <BlogComment blogId={blog?.id} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
