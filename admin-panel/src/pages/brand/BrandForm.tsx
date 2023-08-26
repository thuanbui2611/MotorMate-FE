import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { Brand } from "../../app/models/Brand";
import { useForm, FieldValues } from "react-hook-form";
import { useAppDispatch } from "../../app/store/ConfigureStore";

interface Props {
  brand: Brand | null;
  onClose: () => void;
}

export default function BrandForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "all",
  });

  const dispatch = useAppDispatch();
  async function submitForm(data: FieldValues) {}
  return (
    <>
      <Dialog
        size="xs"
        open={true}
        handler={props.onClose}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Email" size="lg" crossOrigin={undefined} />
            <Input label="Password" size="lg" crossOrigin={undefined} />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" crossOrigin={undefined} />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={props.onClose} fullWidth>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
                onClick={props.onClose}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
