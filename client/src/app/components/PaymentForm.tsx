import { TextField } from "@mui/material";
import { useState } from "react";
// import "../assets/css/paymentForm.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Cards from "react-credit-cards-2";
export default function PaymentForm() {
  type Focused = "name" | "number" | "expiry" | "cvc" | "";
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e: any) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };
  return (
    <>
      <div className="max-w-screen-lg bg-white rounded-lg border border-gray-300 p-5">
        <div className="flex items-start justify-center flex-col">
          <div className="font-bold text-xl py-1">Checkout</div>
          <div className="border-b-[1px] border-r w-72 md:block  border-black"></div>
          <hr className=" h-[1px] border-none bg-black" />
          <div className="flex flex-col items-start justify-center py-2">
            <div className="font-bold text-lg">Address</div>
            <div className=" text-sm">Address information</div>
          </div>
          <div className="border-b-[1px] border-r w-72 md:block  border-black"></div>
          <div className="flex flex-col items-start justify-center">
            <div className="font-bold text-xl py-1"> Payment</div>
            {/* <div className="text-blue-600 font-semibold">VISA</div> */}
            {/* <div className="flex flex-col items-center justify-center gap-4 py-2">
              <div className="flex justify-center items-center gap-4">
                <TextField
                  className="w-full px-4 py-3 bg-transparent rounded-lg border-none"
                  required
                  sx={{
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
                  placeholder="Full Name"
                  variant="outlined"
                  label="Name on card"
                  //   {...register("firstName", {
                  //     required: "First name is required",
                  //     pattern: {
                  //       value:
                  //         /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b)(?!.*[!@#$%^&*()])(?!.*[-+=/\\|[\]{}:;"',.?]).*$/i,
                  //       message: "Invalid name",
                  //     },
                  //   })}
                />
                <TextField
                  className="w-full px-4 py-3 bg-transparent rounded-lg border-none"
                  required
                  sx={{
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
                  placeholder="No."
                  variant="outlined"
                  label="Cart Number"
                  //   {...register("firstName", {
                  //     required: "First name is required",
                  //     pattern: {
                  //       value:
                  //         /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b)(?!.*[!@#$%^&*()])(?!.*[-+=/\\|[\]{}:;"',.?]).*$/i,
                  //       message: "Invalid name",
                  //     },
                  //   })}
                />
              </div>
              <div className="flex justify-center items-center gap-4">
                <TextField
                  className="w-full px-4 py-3 bg-transparent rounded-lg border-none"
                  required
                  sx={{
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
                  placeholder="MM/YY"
                  variant="outlined"
                  label="Expired Date"
                  //   {...register("firstName", {
                  //     required: "First name is required",
                  //     pattern: {
                  //       value:
                  //         /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b)(?!.*[!@#$%^&*()])(?!.*[-+=/\\|[\]{}:;"',.?]).*$/i,
                  //       message: "Invalid name",
                  //     },
                  //   })}
                />
                <TextField
                  className="w-full px-4 py-3 bg-transparent rounded-lg border-none"
                  required
                  sx={{
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
                  placeholder="123"
                  variant="outlined"
                  label="CVV"
                  //   {...register("firstName", {
                  //     required: "First name is required",
                  //     pattern: {
                  //       value:
                  //         /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b)(?!.*[!@#$%^&*()])(?!.*[-+=/\\|[\]{}:;"',.?]).*$/i,
                  //       message: "Invalid name",
                  //     },
                  //   })}
                />
              </div>
            </div> */}
            {/* Test */}

            <div className="flex flex-col justify-center items-center gap-4">
              <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus as Focused}
              />
              <form className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  name="number"
                  placeholder="Card Number"
                  value={state.number}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={state.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <input
                  type="text"
                  name="expiry"
                  placeholder="Expiry"
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <input
                  type="text"
                  name="cvc"
                  placeholder="CVC/CCV"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </form>
            </div>

            {/* <div className="containerVisaCard">
              <div className="cardVisaCard">
                <span className="logoVisaCard">
                  <svg
                    className="p-1"
                    viewBox="0 0 256 83"
                    height="83"
                    width="256"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        y2="100%"
                        y1="-2.006%"
                        x2="54.877%"
                        x1="45.974%"
                        id="logosVisa0"
                      >
                        <stop stop-color="#222357" offset="0%"></stop>
                        <stop stop-color="#254AA5" offset="100%"></stop>
                      </linearGradient>
                    </defs>
                    <path
                      transform="matrix(1 0 0 -1 0 82.668)"
                      d="M132.397 56.24c-.146-11.516 10.263-17.942 18.104-21.763c8.056-3.92 10.762-6.434 10.73-9.94c-.06-5.365-6.426-7.733-12.383-7.825c-10.393-.161-16.436 2.806-21.24 5.05l-3.744-17.519c4.82-2.221 13.745-4.158 23-4.243c21.725 0 35.938 10.724 36.015 27.351c.085 21.102-29.188 22.27-28.988 31.702c.069 2.86 2.798 5.912 8.778 6.688c2.96.392 11.131.692 20.395-3.574l3.636 16.95c-4.982 1.814-11.385 3.551-19.357 3.551c-20.448 0-34.83-10.87-34.946-26.428m89.241 24.968c-3.967 0-7.31-2.314-8.802-5.865L181.803 1.245h21.709l4.32 11.939h26.528l2.506-11.939H256l-16.697 79.963h-17.665m3.037-21.601l6.265-30.027h-17.158l10.893 30.027m-118.599 21.6L88.964 1.246h20.687l17.104 79.963h-20.679m-30.603 0L53.941 26.782l-8.71 46.277c-1.022 5.166-5.058 8.149-9.54 8.149H.493L0 78.886c7.226-1.568 15.436-4.097 20.41-6.803c3.044-1.653 3.912-3.098 4.912-7.026L41.819 1.245H63.68l33.516 79.963H75.473"
                      fill="url(#logosVisa0)"
                    ></path>
                  </svg>
                </span>
                <div className="ownerVisaCard">
                  <TextField
                    className="w-full px-4 py-3 bg-transparent rounded-lg border-none"
                    required
                    sx={{
                      "& label.Mui-focused": {
                        color: "#FF7E06",
                      },
                      "& .MuiOutlinedInput-input": {
                        boxShadow: "none",
                        padding: "0px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover fieldset": {
                          borderColor: "#FF7E06",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#FF7E06",
                        },
                      },
                    }}
                    placeholder="BUI CONG THUAN"
                    variant="outlined"
                    //   {...register("firstName", {
                    //     required: "First name is required",
                    //     pattern: {
                    //       value:
                    //         /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b)(?!.*[!@#$%^&*()])(?!.*[-+=/\\|[\]{}:;"',.?]).*$/i,
                    //       message: "Invalid name",
                    //     },
                    //   })}
                  />
                </div>
                <div className="numberVisaCard">
                  <TextField
                    className="w-full px-4 py-3 bg-transparent rounded-lg border-none"
                    required
                    sx={{
                      "& label.Mui-focused": {
                        color: "#FF7E06",
                      },
                      "& .MuiOutlinedInput-input": {
                        boxShadow: "none",
                        padding: "0px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover fieldset": {
                          borderColor: "#FF7E06",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#FF7E06",
                        },
                      },
                    }}
                    placeholder="**** **** **** 1320"
                    variant="outlined"
                    //   {...register("firstName", {
                    //     required: "First name is required",
                    //     pattern: {
                    //       value:
                    //         /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b)(?!.*[!@#$%^&*()])(?!.*[-+=/\\|[\]{}:;"',.?]).*$/i,
                    //       message: "Invalid name",
                    //     },
                    //   })}
                  />
                </div>
                <div className="CVVisaCard">
                  <TextField
                    className="w-full px-4 py-3 bg-transparent rounded-lg border-none"
                    required
                    sx={{
                      "& label.Mui-focused": {
                        color: "#FF7E06",
                      },
                      "& .MuiOutlinedInput-input": {
                        boxShadow: "none",
                        padding: "0px",
                        width: "50px",
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover fieldset": {
                          borderColor: "#FF7E06",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#FF7E06",
                        },
                      },
                    }}
                    placeholder="CCV"
                    variant="outlined"
                    //   {...register("firstName", {
                    //     required: "First name is required",
                    //     pattern: {
                    //       value:
                    //         /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b)(?!.*[!@#$%^&*()])(?!.*[-+=/\\|[\]{}:;"',.?]).*$/i,
                    //       message: "Invalid name",
                    //     },
                    //   })}
                  />
                </div>
                <div className="expiredVisaCard">
                  <TextField
                    className="w-full px-4 py-3 bg-transparent rounded-lg border-none"
                    required
                    sx={{
                      "& label.Mui-focused": {
                        color: "#FF7E06",
                      },
                      "& .MuiOutlinedInput-input": {
                        boxShadow: "none",
                        padding: "0px",
                        width: "50px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover fieldset": {
                          borderColor: "#FF7E06",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#FF7E06",
                        },
                      },
                    }}
                    placeholder="12/23"
                    variant="outlined"
                    //   {...register("firstName", {
                    //     required: "First name is required",
                    //     pattern: {
                    //       value:
                    //         /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b)(?!.*[!@#$%^&*()])(?!.*[-+=/\\|[\]{}:;"',.?]).*$/i,
                    //       message: "Invalid name",
                    //     },
                    //   })}
                  />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
