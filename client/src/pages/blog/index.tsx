import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { blogSelectors, getBlogsAsync, setBlogParams } from "./BlogSlice";
import { useEffect } from "react";
import Loading from "../../app/components/Loading";
import Pagination from "../../app/components/Pagination";
import { ConvertToDateStr } from "../../app/utils/ConvertDatetimeToStr";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { TextField } from "@mui/material";
import FadeInSection from "../../app/components/FadeInSection";

export default function BlogPage() {
  const [pageNumber, setPageNumber] = useSearchParams({ pageNumber: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
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
  async function handleSubmitSendMail(data: FieldValues) {
    if (errors.email) {
      toast.error("Email is invalid, please try again!");
    }
    const fullName = data.lastName + " " + data.firstName;
    const message =
      "Make me stay up to date for new any features from Motormate.";
    const body = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.5;
            color: #333333;
          }
          h1 {
            color: #FF7E06;
            font-size: 24px;
            margin-bottom: 20px;
          }
          p {
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
      <h1>Motormate get a new subscription!</h1>
        <p>- Email: ${data.email}</p>
        <p>${message}</p>
        <p>Best regards,<br />${data.email}</p>
      </body>
    </html>
    `;
    const formData = {
      toName: fullName,
      toEmail: "motormate.official@gmail.com",
      body: body,
      subject: "Motormate - Subscription",
    };
    toast.success("Thank you for your subscription!");
    await agent.Email.send(formData);
  }
  return !metaData ? (
    <Loading />
  ) : (
    <div>
      {/* Hero section */}
      <FadeInSection options="fade-in-scale">
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
                <span className="text-gradient ">Motormate</span>
              </h1>
              <p className="mt-8 text-gray-700">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolores repellat perspiciatis aspernatur quis voluptatum porro
                incidunt, libero sequi quos eos velit
              </p>
              <div className="mt-10  w-full flex max-w-md mx-auto lg:mx-0">
                <div className="flex sm:flex-row flex-col gap-5 w-full">
                  <form
                    onSubmit={handleSubmit(handleSubmitSendMail)}
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
                    <TextField
                      className="w-full py-3 outline-none bg-transparent"
                      type="email"
                      required
                      sx={{
                        border: "none",

                        "& label.Mui-focused": {
                          color: "#FF7E06",
                        },
                        "& .MuiOutlinedInput-input": {
                          boxShadow: "none",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "transparent",
                          },
                          "&:hover fieldset": {
                            border: "#FF7E06",
                          },
                          "&.Mui-focused fieldset": {
                            border: "#FF7E06",
                          },
                        },
                      }}
                      placeholder="john.doe@email.com"
                      variant="outlined"
                      {...register("email", {
                        required: "Email is required",
                      })}
                    />
                    {/* <input
                    type="email"
                    placeholder="motormate.official@gmail.com"
                    className="w-full py-3 outline-none bg-transparent"
                  /> */}
                    <button
                      type="submit"
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
      </FadeInSection>

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
