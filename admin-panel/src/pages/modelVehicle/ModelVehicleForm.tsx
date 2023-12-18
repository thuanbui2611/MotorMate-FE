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
import { FieldValues, set, useForm } from "react-hook-form";
import { Collection } from "../../app/models/Collection";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { ModelVehicle } from "../../app/models/ModelVehicle";
import {
  addModelVehicleAsync,
  updateModelVehicleAsync,
} from "./ModelVehicleSlice";
import Autocomplete from "@mui/material/Autocomplete";
import { Theme, useTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import LoaderButton from "../../app/components/LoaderButton";
import FormAddColors from "../../app/components/FormAddColors";
import { getCollectionsAsync } from "../filter/FilterSlice";
import { colorSelectors, getColorsAsync } from "../color/ColorSlice";

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
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "all",
  });

  const [defaultCollection, setDefaultCollection] = useState<Collection | null>(
    null
  );
  const [addColorDialog, setAddColorDialog] = useState(false);
  const [colorAdded, setColorAdded] = useState(false);

  const { collections, collectionLoading } = useAppSelector(
    (state) => state.filter
  );
  const { colorLoaded } = useAppSelector((state) => state.color);
  const colors = useAppSelector(colorSelectors.selectAll);

  useEffect(() => {
    if (colors.length === 0 && !colorLoaded) {
      dispatch(getColorsAsync());
    }
    if (collections.length === 0 && !collectionLoading) {
      dispatch(getCollectionsAsync());
    }
  }, []);

  useEffect(() => {
    if (colorAdded) {
      dispatch(getColorsAsync()).then(() => setColorAdded(false));
    }
  }, [colorAdded]);

  useEffect(() => {
    if (modelVehicle) {
      reset(modelVehicle);

      const defaultColors = modelVehicle.colors.map((color) => color.color);
      setDefaultColors(defaultColors || null);

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
      const selectedColors = getSelectedIds(defaultColors);
      const formData = {
        id: modelVehicle?.id,
        name: data.name,
        year: data.year,
        capacity: data.capacity,
        collectionId: data.collectionId,
        colorIds: selectedColors,
      };
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

  const checkAddedColor = () => {
    setColorAdded((cur) => !cur);
  };
  //Test multiple select

  const [defaultColors, setDefaultColors] = useState<string[]>([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
    style: { zIndex: 9999 },
  };

  function getStyles(name: string, colors: string[], theme: Theme) {
    return {
      fontWeight:
        colors.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const selectedColors = event.target.value as string[];
    setDefaultColors(selectedColors);
  };
  const getSelectedIds = (selectedColors: string[]) => {
    return selectedColors.map((color) => {
      const selectedColor = colors.find((c) => c.color === color);
      return selectedColor ? selectedColor.id : "";
    });
  };
  //End

  const cancelAddNewColorForm = () => {
    setAddColorDialog((cur) => !cur);
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
              className="text-center py-4 bg-orange-500 text-white rounded-sm dark:bg-boxdark dark:text-blue-gray-50"
            >
              {actionName}
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit(submitForm)}>
            <CardBody className="flex flex-col gap-4 overflow-y-auto max-h-[600px]">
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div className="w-full md:w-2/3">
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
                </div>

                <div className="w-full md:w-1/3 min-w-[130px]">
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
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div className="w-full items-center justify-center md:w-2/3">
                  {collectionLoading ? (
                    <LoaderButton />
                  ) : (
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
                  )}
                </div>

                <div className="w-full md:w-1/3 min-w-[130px]">
                  <AppTextInput
                    control={control}
                    type="text"
                    label="Capacity"
                    {...register("capacity", {
                      required: "Capacity is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Invalid capacity, accept only number",
                      },
                    })}
                  />
                </div>
              </div>

              <div className="flex justify-center w-full">
                {colorLoaded ? (
                  <LoaderButton />
                ) : (
                  <>
                    <FormControl
                      sx={{ minWidth: "100px", width: "fit-content" }}
                    >
                      <InputLabel id="demo-multiple-chip-label">
                        Color
                      </InputLabel>

                      <Select
                        required
                        multiple
                        value={defaultColors}
                        onChange={handleChange}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Color"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => {
                              const selectedColor = colors.find(
                                (c) => c.color === value
                              );
                              if (selectedColor) {
                                return (
                                  <Chip
                                    key={selectedColor.id}
                                    label={selectedColor.color}
                                  />
                                );
                              }
                              return null;
                            })}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        <MenuItem
                          style={{
                            fontWeight: 600,
                            backgroundColor: "#f0f0f0",
                          }}
                          onClick={() => setAddColorDialog(true)}
                        >
                          Add new colors
                        </MenuItem>

                        {colors.map((color) => (
                          <MenuItem
                            key={color.id}
                            value={color.color}
                            style={getStyles(color.color, defaultColors, theme)}
                          >
                            {color.color}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
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
        {addColorDialog && (
          <FormAddColors
            actionName="Add new color"
            isColorAdded={checkAddedColor}
            cancelForm={cancelAddNewColorForm}
          />
        )}
      </Dialog>
    </>
  );
}
