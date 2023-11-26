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
import { toast } from "react-toastify";

interface Props {
  actionName?: string;
  objectName: string;
  content?: string;
  actionCancel: (reason: string) => Promise<void>;
  onClose: () => void;
}
export default function ConfirmCancelDialog({
  actionName,
  objectName,
  content,
  onClose,
  actionCancel,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reason, setReason] = useState("");

  const onDelete = async () => {
    if (!reason) return toast.error("Please enter your reason!");
    setIsSubmitting(true);
    await actionCancel(reason);
  };
  return (
    <>
      <Dialog
        open={true}
        handler={onClose}
        size="sm"
        className="md:max-w-xl max-w-xs"
      >
        <DialogHeader className="text-red-600 text-3xl font-bold px-8">
          {actionName}
        </DialogHeader>
        <DialogBody divider className="px-8">
          <p className="text-xl font-bold text-red-600 mb-3">
            You should read this carefully!
          </p>
          <p className="text-base font-medium">
            Only vehicles that are{" "}
            <span className="text-orange-based">on going</span> and
            <span className="text-blue-600"> pending</span> will be cancelled.
          </p>
          <p className="text-base font-medium">
            {content}
            <span className="font-bold ml-2">
              {objectName ? objectName : ""}
            </span>
          </p>

          <div className="flex gap-4 items-start justify-start mt-2">
            <p className="font-medium text-base">Reason:</p>
            <TextField
              multiline
              maxRows={3}
              rows={2}
              fullWidth
              onChange={(e: any) => setReason(e.target.value)}
              required
              placeholder="Please let us know your reason!"
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
            onClick={onClose}
            className="mr-1 hover:bg-gray-200"
          >
            <span>Cancel</span>
          </Button>
          <LoadingButton
            size="large"
            className="transition-all rounded-lg shadow-md"
            loading={isSubmitting}
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
