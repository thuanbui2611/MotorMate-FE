import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Brand } from "../../app/models/Brand";
import { useForm, FieldValues } from "react-hook-form";
import { useAppDispatch } from "../../app/store/ConfigureStore";
import AppTextInput from "../../app/components/AppTextInput";
import { useEffect } from "react";
import { addBrandAsync, updateBrandAsync } from "./BrandSlice";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
interface Props {
  brand?: Brand | undefined;
  cancelEdit: () => void;
  actionName: string;
}

export default function BrandForm({ brand, cancelEdit, actionName }: Props) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (brand) reset(brand);
  }, [brand, reset]);

  const dispatch = useAppDispatch();
  async function submitForm(data: FieldValues) {
    try {
      console.log("Reach submit form");
      if (brand) {
        console.log("Reach update brand");
        await dispatch(updateBrandAsync(data));
      } else {
        console.log("Reach add brand");
        await dispatch(addBrandAsync(data));
      }
      cancelEdit();
    } catch (error: any) {
      toast.error("Error: " + error.message);
    }
  }
  return (
    <>
      <Dialog
        size="xs"
        open={true}
        handler={cancelEdit}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader className="text-center">
            <Typography
              variant="h3"
              className="text-center py-4 bg-orange-500 text-white rounded-sm dark:bg-boxdark dark:text-white"
            >
              {actionName}
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit(submitForm)}>
            <CardBody className="flex flex-col gap-4">
              <AppTextInput control={control} name="name" label="Brand name" />
              <AppTextInput control={control} name="logo" label="Logo brand" />
            </CardBody>
            <CardFooter className="pt-0 flex flex-row justify-between gap-10">
              <LoadingButton
                className="bg-gradient-to-tr from-light-blue-600 to-light-blue-400 text-white shadow-md shadow-light-blue-500/20 hover:shadow-lg hover:shadow-light-blue-500/40 active:opacity-[0.85]"
                loading={isSubmitting}
                type="submit"
                variant="contained"
                color="success"
              >
                <span className=" font-bold">Confirm</span>
              </LoadingButton>
              <Button
                variant="gradient"
                color="red"
                size="lg"
                onClick={cancelEdit}
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
