import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import AppTextInput from "../../app/components/AppTextInput";
import { LoadingButton } from "@mui/lab";
import { UserDetail } from "../../app/models/User";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  user: UserDetail | null;
  cancelEdit: () => void;
  actionName: string;
}

export default function UserForm({ user, cancelEdit, actionName }: Props) {
  const [imageUploaded, setImageUploaded] = useState<File | null>();
  const [imageReview, setImageReview] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const [deleteCurrentImage, setDeleteCurrentImage] = useState<boolean>(false);
  const {
    control,
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [reset, setValue, user]);

  const onClose = () => {
    cancelEdit();
  };
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Accept only image file");
    } else {
      setImageUploaded(file);
      setImageReview({
        name: file.name,
        url: URL.createObjectURL(file),
      });
      setDeleteCurrentImage(false);
    }
  };

  async function submitForm(data: FieldValues) {
    try {
    } catch (error) {}
  }
  return (
    <>
      <Dialog
        size="sm"
        open={true}
        handler={cancelEdit}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[40rem]">
          <CardHeader className="text-center">
            <Typography
              variant="h3"
              className="text-center py-4 bg-orange-500 text-white rounded-sm dark:bg-boxdark dark:text-white"
            >
              {actionName}
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit(submitForm)}>
            <CardBody className="flex flex-col gap-4 overflow-y-auto max-h-[600px]">
              <div className="relative z-30 mx-auto h-34 w-34 rounded-full bg-white/20 p-1">
                <div className="relative drop-shadow-2">
                  <img
                    className="h-full w-full rounded-full"
                    src={imageReview ? imageReview.url : user?.picture}
                    alt="profile"
                  />
                  <label
                    htmlFor="profile"
                    className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                  >
                    <svg
                      className="fill-current"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                        fill=""
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                        fill=""
                      />
                    </svg>
                    <input
                      type="file"
                      name="profile"
                      id="profile"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <AppTextInput
                  control={control}
                  label="First name"
                  {...register("firstName", {
                    required: "First name is required",
                    pattern: {
                      value:
                        /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i,
                      message: "Invalid name",
                    },
                  })}
                />
                <AppTextInput
                  control={control}
                  label="Last name"
                  {...register("lastName", {
                    pattern: {
                      value:
                        /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i,
                      message: "Invalid name",
                    },
                  })}
                />
              </div>
              <AppTextInput
                control={control}
                label="Address"
                {...register("address", {
                  required: "Username is required",
                  pattern: {
                    value:
                      /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i,
                    message: "Invalid address",
                  },
                })}
              />
              <div className="flex items-center justify-between gap-4">
                <AppTextInput
                  control={control}
                  label="Phone number"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value:
                        /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i,
                      message: "Invalid phone number",
                    },
                  })}
                />
                <AppTextInput
                  control={control}
                  label="Date of birth"
                  type="date"
                  {...register("dateOfBirth", {
                    pattern: {
                      value:
                        /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i,
                      message: "Invalid date",
                    },
                  })}
                />
              </div>
            </CardBody>
            <CardFooter className="pt-0 flex flex-row justify-between gap-10">
              <LoadingButton
                className="bg-gradient-to-tr from-light-blue-600 to-light-blue-400 text-white shadow-md shadow-light-blue-500/20 hover:shadow-lg hover:shadow-light-blue-500/40 active:opacity-[0.85]"
                loading={isSubmitting}
                type="submit"
                variant="contained"
                color="success"
              >
                <span className="font-bold">Confirm</span>
              </LoadingButton>
              <Button
                variant="gradient"
                color="red"
                size="lg"
                onClick={onClose}
              >
                Cancel
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
}
