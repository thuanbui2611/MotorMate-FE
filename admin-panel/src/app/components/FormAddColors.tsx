import { Button } from "@material-tailwind/react";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "./AppTextInput";
import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../store/ConfigureStore";
import { addColorAsync, updateColorAsync } from "../../pages/color/ColorSlice";
import { Color } from "../models/Color";

interface Props {
  isColorAdded?: () => void;
  color?: Color | null;
  actionName: string;
  cancelForm: () => void;
}

export default function FormAddColors({
  actionName,
  cancelForm,
  isColorAdded,
  color,
}: Props) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "all",
  });
  const [colorPick, setColorPick] = useState("");
  const [colorError, setColorError] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (color) {
      reset(color);
      setColorPick(color.hexCode);
    }
  }, [color, reset]);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  const onClose = () => {
    cancelForm();
  };
  const validateColor = (color: string) => {
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return colorRegex.test(color);
  };
  const handleColorChange = (e: any) => {
    const color = e.target.value;
    setColorPick(color);
    if (color === "") {
      setColorError("");
      setColorError("Hexcode color is required");
    } else if (validateColor(color)) {
      setColorError("");
    } else {
      setColorError("Invalid hex color");
    }
  };

  async function submitForm(data: FieldValues) {
    try {
      const formData = {
        id: color?.id,
        color: data.color,
        hexCode: colorPick,
      };
      if (color) {
        await dispatch(updateColorAsync(formData));
      } else {
        await dispatch(addColorAsync(formData));
      }

      if (isColorAdded) {
        isColorAdded();
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div
        className={`fixed inset-0 h-screen w-screen z-99999 bg-black bg-opacity-30 flex items-center justify-center`}
        onClick={handleClickOutside}
      >
        <form
          className="relative bg-white w-fit h-fit p-4 pt-6 rounded-xl"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="border-b-2 border-neutral-100 border-opacity-100 mb-5 pb-5">
            <p className="text-center text-4xl font-bold text-black">
              {actionName}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-1 top-1 rounded-md flex text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex">
            <div className="flex flex-col mr-2 gap-4 items-center justify-center">
              <AppTextInput
                control={control}
                label="Color name"
                {...register("color", {
                  required: "Color name is required",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Invalid color name",
                  },
                })}
              />
              <TextField
                required
                label="Hex color code"
                value={colorPick}
                onChange={handleColorChange}
                error={!!colorError}
                helperText={colorError}
              />
              <div
                className="w-full h-14 border rounded-md shadow-md"
                style={{
                  backgroundColor: colorPick,
                }}
              ></div>
            </div>
            <HexColorPicker color={colorPick} onChange={setColorPick} />
          </div>
          <div className="flex justify-center items-center gap-6 mt-4">
            <LoadingButton
              className="bg-gradient-to-tr w-[100px] from-light-blue-600 to-light-blue-400 text-white shadow-md shadow-light-blue-500/20 hover:shadow-lg hover:shadow-light-blue-500/40 active:opacity-[0.85]"
              loading={isSubmitting}
              type="submit"
              variant="contained"
              color="success"
            >
              <span className="font-bold">CONFIRM</span>
            </LoadingButton>
            <Button variant="gradient" color="red" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>

      {/* <Dialog
        size="sm"
        open={true}
        handler={cancelForm}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[30rem]">
          <CardHeader className="text-center">
            <Typography
              variant="h3"
              className="text-center py-4 bg-orange-500 text-white rounded-sm dark:bg-boxdark dark:text-white"
            >
              {actionName}
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 overflow-y-auto max-h-[600px]">
            <form
              className="relative bg-white w-fit h-fit "
              onSubmit={handleSubmit(submitForm)}
            >
              <div className="flex">
                <div className="flex flex-col mr-2 gap-4 items-center justify-center">
                  <AppTextInput
                    control={control}
                    label="Color name"
                    {...register("color", {
                      required: "Color name is required",
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: "Invalid color name",
                      },
                    })}
                  />
                  <TextField
                    required
                    label="Hex color code"
                    value={colorPick}
                    onChange={handleColorChange}
                    error={!!colorError}
                    helperText={colorError}
                  />
                  <div
                    className="w-full h-14 border rounded-md shadow-md"
                    style={{
                      backgroundColor: colorPick,
                    }}
                  ></div>
                </div>
                <HexColorPicker color={colorPick} onChange={setColorPick} />
              </div>

              <CardFooter className="flex justify-center items-center gap-6 pb-0">
                <LoadingButton
                  className="bg-gradient-to-tr w-[100px] from-light-blue-600 to-light-blue-400 text-white shadow-md shadow-light-blue-500/20 hover:shadow-lg hover:shadow-light-blue-500/40 active:opacity-[0.85]"
                  loading={isSubmitting}
                  type="submit"
                  variant="contained"
                  color="success"
                >
                  <span className="font-bold">CONFIRM</span>
                </LoadingButton>
                <Button variant="gradient" color="red" onClick={onClose}>
                  Cancel
                </Button>
              </CardFooter>
            </form>
          </CardBody>
        </Card>
      </Dialog> */}
    </>
  );
}
