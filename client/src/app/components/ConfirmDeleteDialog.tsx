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
  actionName?: string;
  objectName: string;
  content?: string;
  actionDelete?: () => Promise<void>;
  cancelDelete: () => void;
}
export default function ConfirmDeleteDialog({
  actionName,
  objectName,
  content,
  cancelDelete,
  actionDelete,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onDelete = async () => {
    setIsSubmitting(true);
    cancelDelete();
    if (actionDelete) {
      await actionDelete();
    }
    setIsSubmitting(false);
  };
  return (
    <>
      <Dialog open={true} handler={cancelDelete} size="sm">
        <DialogHeader className="text-red-600 text-3xl font-bold">
          {actionName ? actionName : "Confirm Delete"}
        </DialogHeader>
        <DialogBody divider>
          <p className="text-xl font-bold text-red-600 mb-3">
            You should read this carefully!
          </p>
          <p className=" text-base font-medium text-black-2">
            {content ? content : "Are you sure you want to delete:"}
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
            className="transition-all rounded-lg shadow-md"
            // loading={isSubmitting}
            color="error"
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
