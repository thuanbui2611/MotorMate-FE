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
import { FieldValues, useForm } from "react-hook-form";
import { Collection } from "../../app/models/Collection";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/store/ConfigureStore";
import { addCollectionAsync, updateCollectionAsync } from "./CollectionSlice";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

interface Props {
  collection: Collection | null;
  cancelEdit: () => void;
  actionName: string;
}

export default function CollectionForm({
  collection,
  cancelEdit,
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

  useEffect(() => {
    if (collection) reset(collection);
  }, [collection, reset]);

  const dispatch = useAppDispatch();

  async function submitForm(data: FieldValues) {
    try {
      const formData = {
        id: collection?.id,
        name: data.name,
        brandId: data.brandId,
      };
      if (collection) {
        await dispatch(updateCollectionAsync(formData));
      } else {
        await dispatch(addCollectionAsync(formData));
      }
      cancelEdit();
    } catch (error: any) {
      toast.error("Error: " + error.message);
    }
  }

  const onClose = () => {
    cancelEdit();
  };
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
            <CardBody className="flex flex-col gap-4 overflow-y-auto max-h-[600px]">
              <AppTextInput
                control={control}
                name="name"
                label="Collection name"
              />
              <AppTextInput control={control} name="brandId" label="Brand id" />
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
