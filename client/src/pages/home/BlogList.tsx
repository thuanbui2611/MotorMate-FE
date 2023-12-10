import { useEffect, useState } from "react";
import { Blog } from "../../app/models/Blog";
import agent from "../../app/api/agent";
import { BlogParams } from "../../app/models/Blog";
import Loading from "../../app/components/Loading";
import { ConvertToDateTimeStr } from "../../app/utils/ConvertDatetimeToStr";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    const params = new URLSearchParams();
    params.append("pageNumber", "1");
    params.append("pageSize", "6");
    try {
      agent.Blog.list(params).then((response) => {
        setBlogs(response.items);
        setLoading(false);
      });
    } catch (error) {
      console.log("Fetch blog homepage: ", error);
    }
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      {blogs.length === 6 ? (
        <div className="flex justify-center items-center">
          <div className="2xl:mx-auto 2xl:container lg:px-20 lg:py-16 md:py-12 md:px-6 py-9 px-4 w-96 sm:w-auto">
            <div className="flex flex-col items-center justify-center">
              <h2 className="mb-4 text-2xl md:text-4xl lg:text-6xl tracking-tight font-extrabold text-gradient">
                Lastest Blogs
              </h2>
              <p className="text-base leading-normal text-center text-white mt-4 lg:w-1/2 md:w-10/12 w-11/12">
                Stay up to date with our latest blog posts, offering exciting
                adventures, helpful tips, and captivating stories
              </p>
            </div>
            <div className="lg:flex items-stretch md:mt-12 mt-8">
              <div className="lg:w-1/2">
                <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6">
                  <Link
                    to={"/blog/" + blogs[0].id}
                    className="sm:w-1/2 h-full relative rounded-xl shadow-md shadow-white/30 hover:brightness-90"
                  >
                    <div>
                      <p className="mt-6 mr-6 py-1 px-2 lg:mt-2 lg:mr-2 bg-gray-600 rounded-full text-xs font-medium leading-3 text-white absolute top-0 right-0">
                        {ConvertToDateTimeStr(blogs[0].createdAt)}
                      </p>
                      <div className="absolute bottom-0 sm:-bottom-1 left-0 titleBlogHome bg-gray-400/50 rounded-t-3xl rounded-b-xl w-full">
                        <h2 className="text-xl font-semibold text-white line-clamp-1">
                          {blogs[0].title}
                        </h2>
                        <p className="text-base leading-4 text-white mt-2 line-clamp-1">
                          {blogs[0].category.name}
                        </p>
                        <div className="flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"></div>
                      </div>
                    </div>
                    <img
                      src={blogs[0].image.imageUrl}
                      className="w-full h-64 lg:max-h-80 lg:h-[19vw] rounded-xl"
                      alt="blog image"
                    />
                  </Link>
                  <Link
                    to={"/blog/" + blogs[1].id}
                    className="sm:w-1/2 h-full sm:mt-0 mt-4 relative  rounded-xl shadow-md shadow-white/30 hover:brightness-90"
                  >
                    <div>
                      <p className="mt-6 mr-6 py-1 px-2 lg:mt-2 lg:mr-2 bg-gray-600 rounded-full text-xs font-medium leading-3 text-white absolute top-0 right-0">
                        {ConvertToDateTimeStr(blogs[1].createdAt)}
                      </p>
                      <div className="absolute bottom-0 sm:-bottom-1 left-0 titleBlogHome bg-gray-400/50 rounded-t-3xl rounded-b-xl w-full">
                        <h2 className="text-xl font-semibold text-white line-clamp-1">
                          {blogs[1].title}
                        </h2>
                        <p className="text-base leading-4 text-white mt-2 line-clamp-1">
                          {blogs[1].category.name}
                        </p>
                        <div className="flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"></div>
                      </div>
                    </div>
                    <img
                      src={blogs[1].image.imageUrl}
                      className="w-full h-64 lg:max-h-80 lg:h-[19vw] rounded-xl"
                      alt="blog image"
                    />
                  </Link>
                </div>
                <Link
                  to={"/blog/" + blogs[2].id}
                  className="relative rounded-xl shadow-md shadow-white/30 hover:brightness-90"
                >
                  <div>
                    <p className="mt-6 mr-6 py-1 px-2 lg:mt-2 lg:mr-2 bg-gray-600 rounded-full text-xs font-medium leading-3 text-white absolute top-0 right-0">
                      {ConvertToDateTimeStr(blogs[2].createdAt)}
                    </p>
                    <div className="absolute bottom-0 left-0 titleBlogHome bg-gray-400/50 rounded-t-3xl rounded-b-xl w-full">
                      <h2 className="font-semibold text-white">
                        {blogs[2].title}
                      </h2>
                      <p className="text-base leading-4 text-white mt-2">
                        {blogs[2].category.name}
                      </p>
                      <div className="flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"></div>
                    </div>
                  </div>
                  <img
                    src={blogs[2].image.imageUrl}
                    alt="blog image"
                    className="w-full mt-8 md:mt-6 sm:block rounded-xl"
                  />
                </Link>
              </div>
              <div className="lg:w-1/2 xl:ml-8 lg:ml-4 lg:mt-0 md:mt-6 mt-4 lg:flex flex-col justify-between">
                <Link
                  to={"/blog/" + blogs[3].id}
                  className="relative rounded-xl shadow-md shadow-white/30 hover:brightness-90"
                >
                  <div>
                    <p className="mt-6 mr-6 py-1 px-2 lg:mt-2 lg:mr-2 bg-gray-600 rounded-full text-xs font-medium leading-3 text-white absolute top-0 right-0">
                      {ConvertToDateTimeStr(blogs[3].createdAt)}
                    </p>
                    <div className="absolute bottom-0 lg:-bottom-1 left-0 titleBlogHome bg-gray-400/50 rounded-t-3xl rounded-b-xl w-full">
                      <h2 className="text-xl font-semibold 5 text-white line-clamp-2">
                        {blogs[3].title}
                      </h2>
                      <p className="text-base leading-4 text-white mt-2 line-clamp-1">
                        {blogs[3].category.name}
                      </p>
                      <div className="flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"></div>
                    </div>
                  </div>
                  <img
                    src={blogs[3].image.imageUrl}
                    alt="blog image"
                    className="w-full sm:block rounded-xl"
                  />
                </Link>
                <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6 md:mt-6 mt-4">
                  <Link
                    to={"/blog/" + blogs[4].id}
                    className="relative w-full rounded-xl shadow-md shadow-white/30 hover:brightness-90"
                  >
                    <div>
                      <p className="mt-6 mr-6 py-1 px-2 lg:mt-2 lg:mr-2 bg-gray-600 rounded-full text-xs font-medium leading-3 text-white absolute top-0 right-0">
                        {ConvertToDateTimeStr(blogs[4].createdAt)}
                      </p>
                      <div className="absolute bottom-0 sm:-bottom-1 left-0 titleBlogHome bg-gray-400/50 rounded-t-3xl rounded-b-xl w-full">
                        <h2 className="text-xl font-semibold 5 text-white line-clamp-2">
                          {blogs[4].title}
                        </h2>
                        <p className="text-base leading-4 text-white mt-2 line-clamp-1">
                          {blogs[4].category.name}
                        </p>
                        <div className="flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"></div>
                      </div>
                    </div>
                    <img
                      src={blogs[4].image.imageUrl}
                      className="w-full rounded-xl"
                      alt="blog image"
                    />
                  </Link>
                  <Link
                    to={"/blog/" + blogs[5].id}
                    className="relative w-full sm:mt-0 mt-4 rounded-xl shadow-md shadow-white/30 hover:brightness-90"
                  >
                    <div>
                      <p className="mt-6 mr-6 py-1 px-2 lg:mt-2 lg:mr-2 bg-gray-600 rounded-full text-xs font-medium leading-3 text-white absolute top-0 right-0">
                        {ConvertToDateTimeStr(blogs[5].createdAt)}
                      </p>
                      <div className="absolute bottom-0 sm:-bottom-1 left-0 titleBlogHome bg-gray-400/50 rounded-t-3xl rounded-b-xl w-full">
                        <h2 className="text-xl font-semibold text-white line-clamp-2">
                          {blogs[5].title}
                        </h2>
                        <p className="text-base leading-4 text-white mt-2 line-clamp-1">
                          {blogs[5].category.name}
                        </p>
                        <div className="flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"></div>
                      </div>
                    </div>
                    <img
                      src={blogs[5].image.imageUrl}
                      className="w-full rounded-xl"
                      alt="blog image"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
}
