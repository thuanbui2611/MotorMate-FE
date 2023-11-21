import { TextField } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";
import FadeInSection from "../../app/components/FadeInSection";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  async function handleSubmitSendMail(data: FieldValues) {
    const fullName = data.lastName + " " + data.firstName;
    const message = `
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
        <h1>Motormate receive a new message from contact us form!</h1>
        <p>- Full name: ${fullName}</p>
        <p>- Email: ${data.email}</p>
        <p>${data.message}</p>
        <p>Best regards,<br />${fullName}</p>
      </body>
    </html>
    `;
    const formData = {
      toName: fullName,
      toEmail: "motormate.official@gmail.com",
      body: message,
      subject: "Motormate - Contact Us",
    };
    toast.success("Thank you for your message, we will contact you soon!");
    await agent.Email.send(formData);
  }
  return (
    <FadeInSection options="fade-in-scale">
      <section className="flex items-center h-full lg:h-screen py-20">
        <div className="justify-center flex-1 max-w-6xl px-4 py-4 mx-auto lg:py-10 md:px-7">
          <div className="flex flex-wrap items-center justify-center -mx-4">
            <div className="w-full px-4 lg:w-1/2">
              <div className="max-w-sm mx-auto ">
                <div className="p-6 mb-6 text-center bg-white border rounded-md shadow dark:border-gray-800 dark:bg-gray-800">
                  <form onSubmit={handleSubmit(handleSubmitSendMail)}>
                    <div className="font-extrabold text-5xl text-gradient mb-6">
                      Contact Us
                    </div>
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-gray-700 ">
                        Please send message for futher information!
                      </h2>
                    </div>
                    <div className="flex flex-wrap mb-4 -mx-2">
                      <div className="w-full px-2 mb-4 lg:mb-0 lg:w-1/2">
                        <TextField
                          className="w-full px-4 py-3 bg-transparent rounded-lg border-none mb-4 bg-gray-100"
                          required
                          sx={{
                            backgroundColor: "#F3F4F6",
                            "& label.Mui-focused": {
                              color: "#FF7E06",
                            },
                            "& .MuiOutlinedInput-input": {
                              boxShadow: "none",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#6B7280",
                              },
                              "&:hover fieldset": {
                                borderColor: "#FF7E06",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#FF7E06",
                              },
                            },
                          }}
                          placeholder="First Name"
                          variant="outlined"
                          label="First Name"
                          {...register("firstName", {
                            required: "First name is required",
                            pattern: {
                              value:
                                /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b)(?!.*[!@#$%^&*()])(?!.*[-+=/\\|[\]{}:;"',.?]).*$/i,
                              message: "Invalid name",
                            },
                          })}
                        />
                      </div>
                      <div className="w-full px-2 lg:w-1/2">
                        <TextField
                          className="w-full px-4 py-3 bg-transparent rounded-lg border-none mb-4 bg-gray-100"
                          required
                          sx={{
                            backgroundColor: "#F3F4F6",
                            "& label.Mui-focused": {
                              color: "#FF7E06",
                            },
                            "& .MuiOutlinedInput-input": {
                              boxShadow: "none",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#6B7280",
                              },
                              "&:hover fieldset": {
                                borderColor: "#FF7E06",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#FF7E06",
                              },
                            },
                          }}
                          placeholder="Last Name"
                          variant="outlined"
                          label="Last Name"
                          {...register("lastName", {
                            required: "Last name is required",
                            pattern: {
                              value:
                                /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i,
                              message: "Invalid name",
                            },
                          })}
                        />
                      </div>
                    </div>
                    <TextField
                      className="w-full px-4 py-3 bg-transparent rounded-lg border-none mb-4 bg-gray-100"
                      type="email"
                      sx={{
                        marginBottom: "16px",
                        backgroundColor: "#F3F4F6",
                        "& label.Mui-focused": {
                          color: "#FF7E06",
                        },
                        "& .MuiOutlinedInput-input": {
                          boxShadow: "none",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#6B7280",
                          },
                          "&:hover fieldset": {
                            borderColor: "#FF7E06",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#FF7E06",
                          },
                        },
                      }}
                      required
                      placeholder="john.doe@email.com"
                      variant="outlined"
                      label="Email"
                      {...register("email", {
                        required: "Email is required",
                      })}
                    />

                    <TextField
                      className="w-full px-4 py-3 bg-transparent rounded-lg border-none mb-4 bg-gray-100"
                      multiline
                      required
                      sx={{
                        marginBottom: "16px",
                        backgroundColor: "#F3F4F6",
                        "& label.Mui-focused": {
                          color: "#FF7E06",
                        },
                        "& .MuiOutlinedInput-input": {
                          boxShadow: "none",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#6B7280",
                          },
                          "&:hover fieldset": {
                            borderColor: "#FF7E06",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#FF7E06",
                          },
                        },
                      }}
                      {...register("message", {
                        required: "Message is required",
                        pattern: {
                          value:
                            /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i,
                          message: "Invalid message",
                        },
                      })}
                      placeholder="Write a message..."
                      maxRows={4}
                      variant="outlined"
                      label="Message"
                    />
                    <button
                      className="w-full py-4 text-sm font-bold leading-normal text-white transition-all duration-300 bg-gradient-to-r from-[#FF6003] to-[#FF7E06] rounded-md hover:bg-orange-based"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="max-w-2xl px-4 mb-16 lg:mb-0 lg:w-1/2 lg:mr-0 lg:ml-auto">
              <h2 className="mb-6 text-3xl font-bold text-white ">
                Get In{" "}
                <span className="text-gradient font-extrabold">Touch</span>
              </h2>
              <div className="flex mb-6 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="text-orange-based w-7 h-7"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"></path>
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                </svg>
                <div className="max-w-xl ml-4 text-lg font-semibold tracking-wide text-gray-200">
                  20 Cong Hoa, Tan Binh, Ho Chi Minh City
                </div>
              </div>
              <div className="flex mb-6 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="text-orange-based w-7 h-7"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path>
                </svg>
                <div className="max-w-xl ml-4 text-lg font-semibold tracking-wide text-gray-200">
                  <span> +84 xxx xxx xxx ,</span> <span> +84 xxx xxx xxx</span>
                </div>
              </div>
              <div className="flex ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="text-orange-based w-7 h-7"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"></path>
                </svg>
                <div className="max-w-xl ml-4 text-lg font-semibold tracking-wide text-gray-200">
                  motormate.official@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
