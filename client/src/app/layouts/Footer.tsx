import { TextField } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { Link } from "react-router-dom";

export default function Footer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  async function handleSubmitSendMail(data: FieldValues) {
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

  return (
    <>
      <footer className="bg-color-header">
        <div className="max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
          {/* <!-- Grid --> */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <div className="col-span-full lg:col-span-1">
              <a
                className="flex-none text-2xl font-black text-orange-based"
                href="#"
                aria-label="Brand"
              >
                MOTORMATE
              </a>
            </div>
            {/* <!-- End Col --> */}

            <div className="col-span-1">
              <h4 className="font-semibold text-gray-100">Product</h4>

              <div className="mt-3 grid space-y-3">
                <p>
                  <Link
                    to="/products"
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                  >
                    Our Products
                  </Link>
                </p>
              </div>
            </div>
            {/* <!-- End Col --> */}

            <div className="col-span-1">
              <h4 className="font-semibold text-gray-100">Company</h4>

              <div className="mt-3 grid space-y-3">
                <p>
                  <Link
                    to="/about"
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                  >
                    About us
                  </Link>
                </p>
                <p>
                  <Link
                    to="/blog"
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                  >
                    Blog
                  </Link>
                </p>
                <p>
                  <Link
                    to="/contact"
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200"
                  >
                    Contact us
                  </Link>{" "}
                  {/* <span className="inline ml-1 text-xs bg-[#ff7e06] text-white py-1 px-2 rounded-md">
                    Become our partner
                  </span> */}
                </p>
              </div>
            </div>
            {/* <!-- End Col --> */}

            <div className="col-span-2">
              <h4 className="font-semibold text-gray-100">Stay up to date</h4>

              <form onSubmit={handleSubmit(handleSubmitSendMail)}>
                <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3 bg-white rounded-md p-2">
                  <div className="w-full">
                    <label htmlFor="hero-input" className="sr-only">
                      Search
                    </label>
                    {/* <input
                      type="text"
                      className="py-3 px-4 block w-full border-transparent shadow-sm rounded-md focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your email"
                    /> */}
                    <TextField
                      className="py-3 px-4 block w-full border-transparent shadow-sm rounded-md focus:z-10 focus:border-blue-500 focus:ring-blue-500"
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
                  </div>
                  <button
                    className="w-full sm:w-auto whitespace-nowrap inline-flex justify-center items-center gap-x-3 text-center bg-[#ff7e06] hover:bg-[#ff7e06] border border-transparent text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7e06] focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="mt-3 text-sm text-gray-400">
                  New "MotorMate" or big discounts. Never spam.
                </p>
              </form>
            </div>
            {/* <!-- End Col --> */}
          </div>
          {/* <!-- End Grid --> */}

          <div className="mt-5 sm:mt-12 grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">
                © 2023 MotorMate. All rights reserved.
              </p>
            </div>
            {/* <!-- End Col --> */}

            {/* <!-- Social Brands --> */}
            <div>
              <a
                className="inline-flex justify-center items-center gap-x-3.5 w-10 h-10 text-center text-gray-200 hover:bg-white/[.1] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900 transition"
                href="#"
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </a>
              <a
                className="inline-flex justify-center items-center gap-x-3.5 w-10 h-10 text-center text-gray-200 hover:bg-white/[.1] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900 transition"
                href="#"
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
              </a>

              <a
                className="inline-flex justify-center items-center gap-x-3.5 w-10 h-10 text-center text-gray-200 hover:bg-white/[.1] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900 transition"
                href="#"
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </div>
            {/* <!-- End Social Brands --> */}
          </div>
        </div>
      </footer>
    </>
  );
}
