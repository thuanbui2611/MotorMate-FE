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
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/store/ConfigureStore";
import { addCollectionAsync, updateCollectionAsync } from "./CollectionSlice";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
import agent from "../../app/api/agent";
import { TextField } from "@mui/material";
import { Brand } from "../../app/models/Brand";
import LoaderButton from "../../app/components/LoaderButton";

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
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "all",
  });

  const [loadingFetchBrand, setLoadingFetchBrand] = useState<boolean>(true);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [defaultBrand, setDefaultBrand] = useState<Brand | null>(null);
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await agent.Brand.all();
        setBrands(response);
        setLoadingFetchBrand(false);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    if (collection) {
      reset(collection);
      const defaultBrand = brands.find(
        (brand) => brand.id === collection.brand.id
      );
      setDefaultBrand(defaultBrand || null);
      setValue("brandId", collection.brand.id);
    }
  }, [collection, reset, setValue, brands]);

  const dispatch = useAppDispatch();

  async function submitForm(data: FieldValues) {
    try {
      const formData = {
        id: collection?.id,
        name: data.name,
        brandId: data.brandId,
        brand: brands.find((brand) => brand.id === data.brandId),
      };
      console.log("Form data:", formData);
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
                label="Collection name"
                {...register("name", {
                  required: "Collection name is required",
                  pattern: {
                    value:
                      /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i, // restrict SQL injection, XXL, XSS, and disallow the characters !@#$%^*:
                    message: "Invalid collection name",
                  },
                })}
              />
              {loadingFetchBrand ? (
                <LoaderButton />
              ) : (
                <Autocomplete
                  disablePortal
                  value={defaultBrand}
                  options={brands}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    const brandId = newValue?.id;
                    setValue("brandId", brandId, { shouldValidate: true });
                    setDefaultBrand(newValue);
                  }}
                  renderInput={(params) => (
                    <AppTextInput
                      {...params}
                      control={control}
                      label="Brand"
                      {...register("brandId", {
                        required: "Brand is required",
                      })}
                      error={!!errors.brandId}
                      helperText={errors?.brandId?.message as string}
                    />
                  )}
                />
              )}
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
