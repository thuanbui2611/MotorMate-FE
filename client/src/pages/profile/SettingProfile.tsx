import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { TextField } from "@mui/material";
import { updateProfileAsync } from "./ProfileSlice";
import { updateUser } from "../account/AccountSlice";
import { useEffect, useRef, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Autocomplete } from "@react-google-maps/api";
import { toast } from "react-toastify";

export default function SettingProfile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState<string>("");
  const {
    control,
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "all",
  });
  const userLogin = useAppSelector((state) => state.account.userDetail);
  const dispatch = useAppDispatch();

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  useEffect(() => {
    if (userLogin) {
      reset(userLogin);
      if (userLogin.dateOfBirth) {
        setValue("dateOfBirth", userLogin.dateOfBirth.substring(0, 10));
      }
      if (userLogin.address) {
        setDefaultAddress(userLogin.address);
      }
    }
  }, [reset, userLogin, isEditMode]);

  const handleAddressSelect = () => {
    if (!autocompleteRef.current) return;
    const place = autocompleteRef.current.getPlace();
    const address: any = autocompleteRef.current;
    const fullAddress = address.gm_accessors_.place.em.formattedPrediction;
    if (!place) {
      toast.error("Please select a valid address");
      return;
    }
    const { place_id } = place;

    // Validate the place_id to ensure it is a valid selection
    if (place_id) {
      setValue("address", fullAddress);
    } else {
      setValue("address", null);
      toast.error("Please select a valid address");
    }
  };

  async function submitForm(data: FieldValues) {
    if (!userLogin) return;
    if (!data.address) {
      toast.error("Please select a valid address");
      return;
    }
    try {
      const formData = {
        username: userLogin?.username,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        bio: data.bio,
        image: userLogin?.image || null,
        dateOfBirth: data.dateOfBirth,
      };

      const response = await dispatch(updateProfileAsync(formData));
      if (updateProfileAsync.fulfilled.match(response)) {
        dispatch(updateUser(response.payload));
        setIsEditMode(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents the form from automatically submitting
    }
  };
  return (
    <>
      <div className="container mx-auto grid grid-cols-6 gap-8 mb-32">
        <div className="hidden sm:block sm:col-span-1"></div>
        <div className="col-span-6 px-4 sm:col-span-4 sm:px-0">
          <div className="border border-stroke bg-white shadow-lg rounded-lg">
            <div className="border-b border-stroke py-4 px-7 bg-gray-100">
              <h3 className="font-medium text-black text-xl md:text-2xl lg:text-3xl">
                Personal Information
              </h3>
            </div>
            <div className="p-7">
              <form
                onKeyDown={handleKeyPress}
                onSubmit={handleSubmit(submitForm)}
              >
                <div className="mb-5 flex flex-col gap-5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black"
                      htmlFor="fullName"
                    >
                      First Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-[13px]">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <TextField
                        className="w-full rounded border border-stroke bg-gray text-black focus:border-primary"
                        sx={{
                          "& .MuiOutlinedInput-input": {
                            boxShadow: "none",
                            padding: "12px 12px 12px 40px",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "black",
                            },
                          },
                        }}
                        {...register("lastName", {
                          required: "Last name is required",
                          pattern: {
                            value:
                              /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i, // restrict SQL injection, XXL, XSS, and disallow the characters !@#$%^*:
                            message: "Invalid name",
                          },
                        })}
                        error={!!errors.lastName}
                        helperText={errors?.lastName?.message as string}
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black"
                      htmlFor="fullName"
                    >
                      Last Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-[13px]">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <TextField
                        className="w-full rounded border border-stroke bg-gray text-black focus:border-primary"
                        sx={{
                          "& .MuiOutlinedInput-input": {
                            boxShadow: "none",
                            padding: "12px 12px 12px 40px",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "black",
                            },
                          },
                        }}
                        {...register("firstName", {
                          required: "First name is required",
                          pattern: {
                            value:
                              /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i, // restrict SQL injection, XXL, XSS, and disallow the characters !@#$%^*:
                            message: "Invalid name",
                          },
                        })}
                        error={!!errors.firstName}
                        helperText={errors?.firstName?.message as string}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-5 flex flex-col gap-5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black"
                      htmlFor="fullName"
                    >
                      Birthday
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-[13px]">
                        <svg
                          fill="#000000"
                          width="20px"
                          height="20px"
                          viewBox="-6 0 32 32"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <title>birthday-cake</title>
                            <path d="M16.32 14.12c-1.56-0.44-3.56-0.72-5.72-0.76v-0.96c0-0.48-0.36-0.84-0.84-0.84s-0.84 0.36-0.84 0.84v0.96c-2.12 0.040-4.12 0.28-5.68 0.76-2.16 0.6-3.24 1.48-3.24 2.6v7.72c0 1.12 1.080 2 3.24 2.64 1.76 0.52 4.080 0.8 6.56 0.8s4.8-0.28 6.56-0.8c2.12-0.6 3.24-1.52 3.24-2.64v-7.72c-0.040-1.12-1.080-2-3.28-2.6zM8.92 15v1.72c0 0.48 0.36 0.84 0.84 0.84s0.84-0.36 0.84-0.84v-1.72c4.36 0.12 7.040 1.16 7.24 1.72-0.080 0.12-0.32 0.32-1.24 0.8-1.2 0.6-1.56 1.6-1.8 2.24-0.040 0.12-0.12 0.32-0.16 0.4-0.080-0.080-0.16-0.24-0.24-0.32-0.36-0.56-1-1.52-2.36-1.44-1.4 0.080-1.8 1.56-2.080 2.6-0.12 0.4-0.32 1.16-0.48 1.24-0.36 0-0.44-0.080-0.72-0.6-0.36-0.6-0.92-1.56-2.44-1.6-0.44-0.040-0.44-0.040-0.6-0.44-0.24-0.56-0.6-1.44-2.12-1.88-1.4-0.4-1.84-0.88-1.88-0.96 0.16-0.56 2.84-1.64 7.2-1.76zM9.76 26.2c-4.92 0-7.92-1.16-8.080-1.76v-5.68c0.36 0.2 0.84 0.36 1.4 0.52 0.76 0.24 0.88 0.52 1.040 0.92 0.24 0.56 0.6 1.4 2.080 1.44 0.64 0.040 0.8 0.28 1.080 0.8 0.36 0.56 0.84 1.44 2.16 1.44 1.44 0 1.8-1.44 2.080-2.52 0.12-0.44 0.36-1.36 0.56-1.36 0.36-0.040 0.48 0.12 0.88 0.68 0.32 0.48 0.8 1.24 1.8 1.16 1-0.12 1.36-0.96 1.56-1.56 0.2-0.56 0.4-1.040 1-1.36 0.16-0.080 0.32-0.16 0.48-0.24v5.72c-0.080 0.64-3.12 1.8-8.040 1.8zM9.76 10.36c1.28 0 2.28-1.040 2.28-2.28 0-0.72-0.6-3.96-2.28-3.96s-2.28 3.28-2.28 3.96c0 1.24 1.040 2.28 2.28 2.28zM9.76 5.96c0.28 0.48 0.6 1.56 0.6 2.12 0 0.32-0.28 0.6-0.6 0.6s-0.6-0.28-0.6-0.6c0-0.56 0.32-1.6 0.6-2.12z"></path>{" "}
                          </g>
                        </svg>
                      </span>

                      <TextField
                        type="date"
                        className="w-full rounded border border-stroke bg-gray text-black focus:border-primary"
                        sx={{
                          "& .MuiOutlinedInput-input": {
                            boxShadow: "none",
                            padding: "12px 12px 12px 40px",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "black",
                            },
                          },
                        }}
                        {...register("dateOfBirth", {
                          pattern: {
                            value:
                              /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i,
                            message: "Invalid date",
                          },
                        })}
                        error={!!errors.dateOfBirth}
                        helperText={errors?.dateOfBirth?.message as string}
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black"
                      htmlFor="fullName"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-[14px]">
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.73268 2.043C6.95002 0.832583 8.95439 1.04804 9.9737 2.40962L11.2347 4.09402C12.0641 5.20191 11.9909 6.75032 11.0064 7.72923L10.7676 7.96665C10.7572 7.99694 10.7319 8.09215 10.76 8.2731C10.8232 8.6806 11.1635 9.545 12.592 10.9654C14.02 12.3853 14.8905 12.7253 15.3038 12.7887C15.4911 12.8174 15.5891 12.7906 15.6194 12.78L16.0274 12.3743C16.9026 11.5041 18.2475 11.3414 19.3311 11.9305L21.2416 12.9691C22.8775 13.8584 23.2909 16.0821 21.9505 17.4148L20.53 18.8273C20.0824 19.2723 19.4805 19.6434 18.7459 19.7119C16.9369 19.8806 12.7187 19.6654 8.28659 15.2584C4.14868 11.144 3.35462 7.556 3.25415 5.78817L4.00294 5.74562L3.25415 5.78817C3.20335 4.89426 3.62576 4.13796 4.16308 3.60369L5.73268 2.043ZM8.77291 3.30856C8.26628 2.63182 7.322 2.57801 6.79032 3.10668L5.22072 4.66737C4.8908 4.99542 4.73206 5.35695 4.75173 5.70307C4.83156 7.10766 5.47286 10.3453 9.34423 14.1947C13.4057 18.2331 17.1569 18.3536 18.6067 18.2184C18.9029 18.1908 19.1975 18.0369 19.4724 17.7636L20.8929 16.3511C21.4704 15.777 21.343 14.7315 20.5252 14.2869L18.6147 13.2484C18.0871 12.9616 17.469 13.0562 17.085 13.438L16.6296 13.8909L16.1008 13.359C16.6296 13.8909 16.6289 13.8916 16.6282 13.8923L16.6267 13.8937L16.6236 13.8967L16.6171 13.903L16.6025 13.9166C16.592 13.9262 16.5799 13.9367 16.5664 13.948C16.5392 13.9705 16.5058 13.9959 16.4659 14.0227C16.3858 14.0763 16.2801 14.1347 16.1472 14.1841C15.8764 14.285 15.5192 14.3392 15.0764 14.2713C14.2096 14.1384 13.0614 13.5474 11.5344 12.0291C10.0079 10.5113 9.41194 9.36834 9.2777 8.50306C9.20906 8.06061 9.26381 7.70331 9.36594 7.43225C9.41599 7.29941 9.47497 7.19378 9.5291 7.11389C9.5561 7.07405 9.58179 7.04074 9.60446 7.01368C9.6158 7.00015 9.6264 6.98817 9.63604 6.9777L9.64977 6.96312L9.65606 6.95666L9.65905 6.95363L9.66051 6.95217C9.66122 6.95146 9.66194 6.95075 10.1908 7.48258L9.66194 6.95075L9.94875 6.66556C10.3774 6.23939 10.4374 5.53194 10.0339 4.99297L8.77291 3.30856Z"
                              fill="#000000"
                            ></path>{" "}
                          </g>
                        </svg>
                      </span>
                      <TextField
                        className="w-full rounded border border-stroke bg-gray text-black focus:border-primary"
                        sx={{
                          "& .MuiOutlinedInput-input": {
                            boxShadow: "none",
                            padding: "12px 12px 12px 40px",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "black",
                            },
                          },
                        }}
                        {...register("phoneNumber", {
                          required: "Phone number is required",
                          pattern: {
                            value:
                              /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i,
                            message: "Invalid phone number",
                          },
                        })}
                        error={!!errors.phoneNumber}
                        helperText={errors?.phoneNumber?.message as string}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    className="mb-3 block text-sm font-medium text-black"
                    htmlFor="fullName"
                  >
                    Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-[13px]">
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 1024 1024"
                        fill="#000000"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M512 1012.8c-253.6 0-511.2-54.4-511.2-158.4 0-92.8 198.4-131.2 283.2-143.2h3.2c12 0 22.4 8.8 24 20.8 0.8 6.4-0.8 12.8-4.8 17.6-4 4.8-9.6 8.8-16 9.6-176.8 25.6-242.4 72-242.4 96 0 44.8 180.8 110.4 463.2 110.4s463.2-65.6 463.2-110.4c0-24-66.4-70.4-244.8-96-6.4-0.8-12-4-16-9.6-4-4.8-5.6-11.2-4.8-17.6 1.6-12 12-20.8 24-20.8h3.2c85.6 12 285.6 50.4 285.6 143.2 0.8 103.2-256 158.4-509.6 158.4z m-16.8-169.6c-12-11.2-288.8-272.8-288.8-529.6 0-168 136.8-304.8 304.8-304.8S816 145.6 816 313.6c0 249.6-276.8 517.6-288.8 528.8l-16 16-16-15.2zM512 56.8c-141.6 0-256.8 115.2-256.8 256.8 0 200.8 196 416 256.8 477.6 61.6-63.2 257.6-282.4 257.6-477.6C768.8 172.8 653.6 56.8 512 56.8z m0 392.8c-80 0-144.8-64.8-144.8-144.8S432 160 512 160c80 0 144.8 64.8 144.8 144.8 0 80-64.8 144.8-144.8 144.8zM512 208c-53.6 0-96.8 43.2-96.8 96.8S458.4 401.6 512 401.6c53.6 0 96.8-43.2 96.8-96.8S564.8 208 512 208z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                    <Autocomplete
                      onLoad={(autocomplete) =>
                        (autocompleteRef.current = autocomplete)
                      }
                      onPlaceChanged={handleAddressSelect}
                      options={{
                        componentRestrictions: { country: "vn" },
                      }}
                    >
                      <TextField
                        className="w-full rounded border border-stroke bg-gray text-black focus:border-primary"
                        sx={{
                          "& .MuiOutlinedInput-input": {
                            boxShadow: "none",
                            padding: "12px 12px 12px 40px",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "black",
                            },
                          },
                        }}
                        {...register("address", {
                          pattern: {
                            value:
                              /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i, // restrict SQL injection, XXL, XSS, and disallow the characters !@#$%^*:
                            message: "Invalid address",
                          },
                        })}
                        error={!!errors.address}
                        helperText={errors?.address?.message as string}
                        defaultValue={defaultAddress}
                      />
                    </Autocomplete>
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    className="mb-3 block text-sm font-medium text-black "
                    htmlFor="Username"
                  >
                    BIO
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-4">
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                            fill=""
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                            fill=""
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_88_10224">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>

                    <TextField
                      multiline
                      rows={6}
                      className="w-full rounded border border-stroke bg-gray text-black focus:border-primary"
                      sx={{
                        "& .MuiOutlinedInput-input": {
                          boxShadow: "none",
                          paddingLeft: "34px",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "black",
                          },
                        },
                      }}
                      {...register("bio")}
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <LoadingButton
                    sx={{ fontWeight: 600 }}
                    type="submit"
                    size="large"
                    loading={isSubmitting}
                    color="primary"
                    variant="contained"
                  >
                    Save
                  </LoadingButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
