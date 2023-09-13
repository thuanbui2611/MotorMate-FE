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
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { ModelVehicle } from "../../app/models/ModelVehicle";
import {
  addModelVehicleAsync,
  updateModelVehicleAsync,
} from "./ModelVehicleSlice";
import agent from "../../app/api/agent";
import { Color } from "../../app/models/Color";
import Autocomplete from "@mui/material/Autocomplete";

interface Props {
  modelVehicle: ModelVehicle | null;
  cancelEdit: () => void;
  actionName: string;
}

export default function CollectionForm({
  modelVehicle,
  cancelEdit,
  actionName,
}: Props) {
  const {
    control,
    register,
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "all",
  });

  const [colors, setColors] = useState<Color[]>([]);
  const [defaultColor, setDefaultColor] = useState<Color | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [defaultCollection, setDefaultCollection] = useState<Collection | null>(
    null
  );

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await agent.Color.all();
        setColors(response);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };
    const fetchCollection = async () => {
      try {
        const response = await agent.Collection.all();
        setCollections(response);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchColors();
    fetchCollection();
  }, []);

  useEffect(() => {
    if (modelVehicle) {
      reset(modelVehicle);

      const defaultColor = colors.find(
        (color) => color.id === modelVehicle.colors[0].id.toString()
      );
      setDefaultColor(defaultColor || null);
      setValue("colorId", modelVehicle.colors[0].id.toString());

      const defaultCollection = collections.find(
        (collection) => collection.id === modelVehicle.collection.id.toString()
      );

      setDefaultCollection(defaultCollection || null);
      setValue("collectionId", modelVehicle.collection.id);
    }
  }, [modelVehicle, reset, setValue, colors, collections]);

  const dispatch = useAppDispatch();

  async function submitForm(data: FieldValues) {
    try {
      console.log("Data:", data);
      const formData = {
        id: modelVehicle?.id,
        name: data.name,
        year: data.year,
        capacity: data.capacity,
        collectionId: data.collectionId,
        colorIds: [data.colorId],
      };
      console.log("Form data:", formData);
      if (modelVehicle) {
        await dispatch(updateModelVehicleAsync(formData));
      } else {
        await dispatch(addModelVehicleAsync(formData));
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
        size="sm"
        open={true}
        handler={cancelEdit}
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
          <form onSubmit={handleSubmit(submitForm)}>
            <CardBody className="flex flex-col gap-4 overflow-y-auto max-h-[600px]">
              <AppTextInput
                control={control}
                label="Model name"
                {...register("name", {
                  required: "Model name is required",
                  pattern: {
                    value:
                      /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i,
                    message: "Invalid model name",
                  },
                })}
              />
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div className="w-full md:w-2/3">
                  <Autocomplete
                    disablePortal
                    value={defaultCollection}
                    options={collections}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                      const collectionId = newValue?.id;
                      setValue("collectionId", collectionId, {
                        shouldValidate: true,
                      });
                      setDefaultCollection(newValue);
                    }}
                    renderInput={(params) => (
                      <AppTextInput
                        {...params}
                        control={control}
                        label="Collection"
                        {...register("collectionId", {
                          required: "Collection is required",
                        })}
                        error={!!errors.collectionId}
                        helperText={errors?.collectionId?.message as string}
                      />
                    )}
                  />
                </div>

                <div className="w-full md:w-1/3 min-w-[130px]">
                  <Autocomplete
                    disablePortal
                    value={defaultColor}
                    options={colors}
                    getOptionLabel={(option) => option.color}
                    onChange={(event, newValue) => {
                      const colorId = newValue?.id;
                      setValue("colorId", colorId, { shouldValidate: true });
                      setDefaultColor(newValue);
                    }}
                    renderInput={(params) => (
                      <AppTextInput
                        {...params}
                        control={control}
                        label="Color"
                        {...register("colorId", {
                          required: "Color is required",
                        })}
                        error={!!errors.colorId}
                        helperText={errors?.colorId?.message as string}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <AppTextInput
                  control={control}
                  type="text"
                  label="Year release"
                  {...register("year", {
                    required: "Year release is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Invalid year release, accept only number",
                    },
                  })}
                />
                <AppTextInput
                  control={control}
                  type="text"
                  label="Capacity"
                  {...register("capacity", {
                    required: "Year release is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Invalid year release, accept only number",
                    },
                  })}
                />
              </div>
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
