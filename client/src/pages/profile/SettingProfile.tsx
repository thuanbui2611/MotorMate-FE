import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { TextField } from "@mui/material";
import { updateProfileAsync } from "./ProfileSlice";
import { updateUser } from "../account/AccountSlice";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";

export default function SettingProfile() {
  const [isEditMode, setIsEditMode] = useState(false);
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

  useEffect(() => {
    if (userLogin) {
      reset(userLogin);
      if (userLogin.dateOfBirth) {
        setValue("dateOfBirth", userLogin.dateOfBirth.substring(0, 10));
      }
    }
  }, [reset, userLogin, isEditMode]);

  async function submitForm(data: FieldValues) {
    debugger;
    try {
      const formData = {
        username: userLogin?.username,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
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

  return (
    <>
      <div className="container mx-auto mt-5 mb-32 p-5 flex-grow">
        <div className="flex justify-center items-center w-full mx-auto rounded-sm">
          <div className="bg-gray-100 p-3 shadow-sm rounded-xl w-fit">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 pb-4">
              <span className="text-green-500">
                <svg
                  className="h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span className="tracking-wide text-3xl font-bold">
                My Account Information
              </span>
            </div>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="grid md:grid-cols-2 text-sm">
                <div className="flex justify-start items-center w-fit">
                  <div className="px-4 py-2 font-semibold w-fit">
                    First Name
                  </div>
                  <TextField
                    className={`font-semibold ${
                      isEditMode ? "bg-white rounded-md" : ""
                    }`}
                    disabled={!isEditMode}
                    sx={{
                      border: "none",
                      "& .MuiInputBase-root": {
                        height: "25px",
                      },
                      "& .MuiOutlinedInput-input": {
                        boxShadow: "none",
                      },
                      "& fieldset": { border: "none" },
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
                <div className="flex justify-start items-center w-fit ">
                  <div className="px-4 py-2 font-semibold">Last Name</div>
                  <TextField
                    className={`font-semibold ${
                      isEditMode ? "bg-white rounded-md" : ""
                    }`}
                    disabled={!isEditMode}
                    sx={{
                      border: "none",
                      "& .MuiInputBase-root": {
                        height: "25px",
                      },
                      "& .MuiOutlinedInput-input": {
                        boxShadow: "none",
                      },
                      "& fieldset": { border: "none" },
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
                <div className="flex justify-start items-center w-fit">
                  <div className="px-4 py-2 font-semibold">Contact No.</div>
                  <TextField
                    className={`font-semibold ${
                      isEditMode ? "bg-white rounded-md" : ""
                    }`}
                    disabled={!isEditMode}
                    sx={{
                      border: "none",
                      "& .MuiInputBase-root": {
                        height: "25px",
                      },
                      "& .MuiOutlinedInput-input": {
                        boxShadow: "none",
                      },
                      "& fieldset": { border: "none" },
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
                <div className="flex justify-start items-center w-fit">
                  <div className="px-4 py-2 font-semibold">Birthday</div>
                  <TextField
                    className={`font-semibold ${
                      isEditMode ? "bg-white rounded-md" : ""
                    }`}
                    disabled={!isEditMode}
                    type="date"
                    sx={{
                      border: "none",
                      "& .MuiInputBase-root": {
                        height: "25px",
                      },
                      "& .MuiOutlinedInput-input": {
                        boxShadow: "none",
                      },
                      "& fieldset": { border: "none" },
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
              <div className="flex justify-start items-center text-sm">
                <div className="px-4 py-2 font-semibold w-fit">Address</div>
                <TextField
                  className={`font-semibold ${
                    isEditMode ? "bg-white rounded-md" : ""
                  }`}
                  disabled={!isEditMode}
                  sx={{
                    border: "none",
                    "& .MuiInputBase-root": {
                      height: "25px",
                    },
                    "& .MuiOutlinedInput-input": {
                      boxShadow: "none",
                    },
                    "& fieldset": { border: "none" },
                  }}
                  {...register("address", {
                    required: "Address is required",
                    pattern: {
                      value:
                        /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i, // restrict SQL injection, XXL, XSS, and disallow the characters !@#$%^*:
                      message: "Invalid address",
                    },
                  })}
                  error={!!errors.address}
                  helperText={errors?.address?.message as string}
                />
              </div>
            </form>
            {isEditMode ? (
              <div className="flex justify-center items-center gap-4 my-4">
                <LoadingButton
                  className="w-fit text-sm"
                  sx={{ fontWeight: "bold" }}
                  loading={isSubmitting}
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(submitForm)}
                >
                  Save
                </LoadingButton>
                <LoadingButton
                  className="w-fit text-sm"
                  sx={{ fontWeight: "bold" }}
                  disabled={isSubmitting}
                  variant="contained"
                  color="error"
                  onClick={() => setIsEditMode(false)}
                >
                  Cancel
                </LoadingButton>
              </div>
            ) : (
              <button
                className="mx-auto block w-fit text-sm focus:outline-none hover:shadow-xs p-3 my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => setIsEditMode(true)}
              >
                Edit My Information
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
