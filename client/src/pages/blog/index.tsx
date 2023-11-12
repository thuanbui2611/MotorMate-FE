import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { blogSelectors, getBlogsAsync, setBlogParams } from "./BlogSlice";
import { useEffect } from "react";
import Loading from "../../app/components/Loading";
import Pagination from "../../app/components/Pagination";
import { ConvertDatetimeToDisplay } from "../../app/utils/ConvertDatetimeToDate";

export default function BlogPage() {
  const [pageNumber, setPageNumber] = useSearchParams({ pageNumber: "" });

  const blogs = useAppSelector(blogSelectors.selectAll);
  const { blogLoaded, metaData, blogParams } = useAppSelector(
    (state) => state.blog
  );
  const dispatch = useAppDispatch();

  //Pagination
  const pageNum = pageNumber.get("pageNumber");
  useEffect(() => {
    if (!pageNum || pageNum === "1") {
      setPageNumber((prev) => {
        prev.delete("pageNumber");
        return prev;
      });
      dispatch(setBlogParams({ pageNumber: 1 }));
    } else {
      dispatch(setBlogParams({ pageNumber: +pageNum }));
    }
  }, [pageNum, dispatch]);

  useEffect(() => {
    if (!blogLoaded) {
      dispatch(getBlogsAsync());
    }
  }, [dispatch, blogParams]);

  return !metaData ? (
    <Loading />
  ) : (
    <div>
      {/* Hero section */}
      <section className="relative py-32 lg:py-36 bg-white">
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">
            <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-black blur-xl opacity-60 lg:opacity-95 lg:block hidden"></span>
            <span className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-orange-based blur-xl opacity-80"></span>
          </div>
          <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-[#FF6003] to-[#FF7E06] absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
          <div
            className="relative flex flex-col items-center text-center lg:text-left lg:py-7 xl:py-8 
            lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2"
          >
            <h1
              className="text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl
            font-bold text-gray-900"
            >
              Stay Up To Date With{" "}
              {/* <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 from-20% via-blue-600 via-30% to-green-600">
                {" "}
              </span> */}
              <span className="text-gradient ">Motormate</span>
            </h1>
            <p className="mt-8 text-gray-700">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
              repellat perspiciatis aspernatur quis voluptatum porro incidunt,
              libero sequi quos eos velit
            </p>
            <div className="mt-10  w-full flex max-w-md mx-auto lg:mx-0">
              <div className="flex sm:flex-row flex-col gap-5 w-full">
                <form
                  action="#"
                  className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-gray-600 shadow-lg shadow-gray-200/20
                            border border-gray-200 bg-gray-100 rounded-full ease-linear focus-within:bg-white  focus-within:border-blue-600"
                >
                  <span className="min-w-max pr-2 border-r border-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                      />
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="motormate.official@gmail.com"
                    className="w-full py-3 outline-none bg-transparent"
                  />
                  <button
                    className="flex text-white justify-center items-center w-max min-w-max sm:w-max px-6 h-12 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                                after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-color-header hover:after:opacity-100 hover:after:scale-[2.5]  bg-gradient-to-r from-[#FF6003] to-[#FF7E06] border-transparent hover:border-[#172554]"
                  >
                    <span className="hidden sm:flex relative z-[5]">
                      Get Started
                    </span>
                    <span className="flex sm:hidden relative z-[5]">
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
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="flex flex-1 lg:w-1/2 lg:h-auto relative lg:max-w-none lg:mx-0 mx-auto max-w-3xl">
            <img
              src="https://agencex-astro.vercel.app/images/image1.webp"
              alt="Hero image"
              width="2350"
              height="2359"
              className="lg:absolute lg:w-full lg:h-full rounded-3xl object-cover lg:max-h-none max-h-96"
            />
          </div>
        </div>
      </section>
      {/* end of card blog */}
      <section className="bg-white ">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
            Blog
          </h1>

          <div className="grid grid-cols-1 gap-4 lg:gap-8 mt-8 lg:mt-16 lg:grid-cols-2">
            {blogs.map((blog, index) => (
              <Link
                className="lg:flex group"
                to={"/blog/" + blog.id}
                key={blog.id}
              >
                <div className="relative flex flex-row md:flex-col lg:flex-row lg:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-3xl mx-auto border border-gray-200 bg-white group-hover:border-orange-based">
                  <div className="w-1/3 md:w-full lg:w-1/3 bg-white grid place-items-center">
                    <img
                      src={blog.image.imageUrl}
                      alt="Blog image"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="w-2/3 md:w-full lg:w-2/3 bg-white flex flex-col p-3">
                    <div className="flex justify-between item-center">
                      <p className="text-gray-500 font-medium hidden md:block text-xs md:text-sm lg:text-base">
                        {/* category */}
                        {blog.category.name}
                      </p>
                      {/* Rating */}
                      {/* <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <p className="text-gray-600 font-bold text-sm ml-1">
                          4.96
                          <span className="text-gray-500 font-normal">
                            (76 reviews)
                          </span>
                        </p>
                      </div>
                      <div className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-pink-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div> */}
                      <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                        {ConvertDatetimeToDisplay(blog.createdAt)}
                      </div>
                    </div>
                    <h3 className="font-black text-gray-800 lg:text-3xl text-xl group-hover:text-orange-based">
                      {blog.title}
                    </h3>
                    <p className="lg:text-lg text-gray-500 text-sm line-clamp-3">
                      {blog.shortDescription}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-center mt-4 gap-4 sm:flex-row sm:items-center sm:justify-center">
            <Pagination
              metaData={metaData}
              onPageChange={(page: number) => {
                setPageNumber((prev) => {
                  prev.set("pageNumber", page.toString());
                  return prev;
                });
              }}
              loading={blogLoaded}
            />
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center px-4 sm:px-6 lg:px-4 pb-12 bg-white w-full h-fit">
        <article className="max-w-7xl ">
          {/* <h2 className="text-2xl font-extrabold text-black">News</h2> */}
          <section className="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8">
            <article
              className="relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl  transition duration-300 ease-in-out"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80')`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
              <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
                <h3 className="text-center">
                  <a
                    className="text-white text-2xl font-bold text-center"
                    href="#"
                  >
                    <span className="absolute inset-0"></span>
                    Top 10 highest paid programming languages of 2021
                  </a>
                </h3>
              </div>
            </article>
            <article
              className="relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl  transition duration-300 ease-in-out"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80')`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
              <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
                <h3 className="text-center">
                  <a
                    className="text-white text-2xl font-bold text-center"
                    href="#"
                  >
                    <span className="absolute inset-0"></span>
                    Python Frameworks
                  </a>
                </h3>
              </div>
            </article>
            <article
              className="relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl  transition duration-300 ease-in-out"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80')`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
              <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
                <h3 className="text-center">
                  <a
                    className="text-white text-2xl font-bold text-center"
                    href="#"
                  >
                    <span className="absolute inset-0"></span>
                    The best plugins for Visual Studio Code
                  </a>
                </h3>
              </div>
            </article>
          </section>
        </article>
      </section>
    </div>
  );
}
