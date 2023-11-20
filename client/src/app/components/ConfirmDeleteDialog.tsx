import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
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
      <Dialog
        open={true}
        handler={cancelDelete}
        size="sm"
        className="md:max-w-xl max-w-xs"
      >
        <DialogHeader className="text-red-600 text-3xl font-bold px-8">
          {actionName ? actionName : "Confirm Delete"}
        </DialogHeader>
        <DialogBody divider className="px-8">
          <p className="text-xl font-bold text-red-600 mb-3">
            You should read this carefully!
          </p>
          <p className="text-base font-medium">
            {content ? content : "Are you sure you want to delete:"}
            <span className="font-bold ml-2">{objectName}</span>
          </p>
          <div className="flex gap-4 items-start justify-start mt-2">
            <p className="font-medium text-base">Reason:</p>
            <TextField
              multiline
              maxRows={3}
              rows={2}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-input": {
                  boxShadow: "none",
                },
                "& .MuiInputBase-root": {
                  padding: 1,
                },
              }}
            />
          </div>
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
