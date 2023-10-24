import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

interface Props {
  objectName: string;
  actionDelete: () => Promise<void>;
  cancelDelete: () => void;
}
export default function ConfirmDeleteDialog({
  objectName,
  cancelDelete,
  actionDelete,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onDelete = async () => {
    setIsSubmitting(true);
    await actionDelete();
    cancelDelete();
    setIsSubmitting(false);
  };
  return (
    <>
      <Dialog open={true} handler={cancelDelete} className="w-1/2">
        <DialogHeader className="text-red-600 text-3xl">
          Confirm Delete
        </DialogHeader>
        <DialogBody divider>
          <p className=" text-xl font-bold text-red-600 mb-3">
            You should read this carefully!
          </p>
          <p className=" text-base font-medium text-black-2">
            Are you sure you want to delete:
            <span className="font-bold ml-2">{objectName}</span>
          </p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={cancelDelete}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <LoadingButton
            size="large"
            className="transition-all rounded-lg bg-gradient-to-tr from-green-600 to-green-400 shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85]"
            loading={isSubmitting}
            onClick={() => onDelete()}
            variant="contained"
          >
            <span
              className={`font-bold text-xs ${
                isSubmitting ? "text-transparent" : "text-white"
              }`}
            >
              Confirm
            </span>
          </LoadingButton>
        </DialogFooter>
      </Dialog>
    </>
  );
}
