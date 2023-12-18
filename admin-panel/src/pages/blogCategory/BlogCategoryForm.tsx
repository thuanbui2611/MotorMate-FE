import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Category } from "../../app/models/Category";
import { useAppDispatch } from "../../app/store/ConfigureStore";
import {
  addBlogCategoryAsync,
  updateBlogCategoryAsync,
} from "./BlogCategorySlice";
import { toast } from "react-toastify";
import AppTextInput from "../../app/components/AppTextInput";
import { LoadingButton } from "@mui/lab";

interface Props {
  category: Category | null;
  cancelForm: () => void;
  actionName: string;
}
export default function BlogCategoryForm({
  category,
  cancelForm,
  actionName,
}: Props) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "all",
  });
  const [imageUploaded, setImageUploaded] = useState<File | null>();
  const [imageReview, setImageReview] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const [deleteCurrentImage, setDeleteCurrentImage] = useState<boolean>(false);

  useEffect(() => {
    if (category) reset(category);
  }, [category, reset]);

  const dispatch = useAppDispatch();

  async function submitForm(data: FieldValues) {
    try {
      const formData = {
        id: category?.id,
        name: data.name,
      };
      if (category) {
        await dispatch(updateBlogCategoryAsync(formData));
      } else {
        await dispatch(addBlogCategoryAsync(formData));
      }
      onClose();
    } catch (error: any) {
      toast.error("Error: " + error.message);
    }
  }

  const onClose = () => {
    cancelForm();
  };
  return (
    <>
      <Dialog
        size="xs"
        open={true}
        handler={cancelForm}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader className="text-center">
            <Typography
              variant="h3"
              className="text-center py-4 bg-orange-500 text-white rounded-sm dark:bg-boxdark dark:text-blue-gray-50"
            >
              {actionName}
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit(submitForm)}>
            <CardBody className="flex flex-col gap-4 overflow-y-auto max-h-[600px]">
              <AppTextInput
                control={control}
                name="name"
                label="Category name"
              />
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
