import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { LoadingButton } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { UnavailableDates } from "../../app/models/Cart";
import { toast } from "react-toastify";

interface Props {
  datesDisableRent: UnavailableDates[];
  action: (dateFrom: Date, dateTo: Date) => void;
  onClose: () => void;
}
export default function ChooseDateRentDialog({
  action,
  onClose,
  datesDisableRent,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  const onAction = async () => {
    if (startDate === undefined || endDate === undefined) {
      toast.error("Please choose your date rent!");
      return;
    }
    let dateFrom = new Date(startDate);
    let dateTo = new Date(endDate);

    setIsSubmitting(true);

    await action(dateFrom, dateTo);
  };

  const shouldDisableDateStart = (
    date: any,
    datesDisableRent: UnavailableDates[]
  ) => {
    const dateOption = new Date(date);
    const dateFromOption = new Date(
      dateOption.getFullYear(),
      dateOption.getMonth(),
      dateOption.getDate()
    );
    if (dateFromOption < new Date()) return true;
    const disabledDateTimeLocal = getDisabledDateTimeLocal(datesDisableRent);
    if (disabledDateTimeLocal.length === 0) return false;
    let check: boolean = false;
    for (const dateDisabled of disabledDateTimeLocal) {
      if (
        dateFromOption >= dateDisabled.from &&
        dateFromOption <= dateDisabled.to
      ) {
        check = true;
        break;
      }
    }
    return check;
  };

  const getDisabledDateTimeLocal = (
    datesDisableRent: UnavailableDates[]
  ): { from: Date; to: Date }[] => {
    return datesDisableRent.map((date) => {
      const fromUTC = new Date(date.from);
      const toUTC = new Date(date.to);
      return {
        from: new Date(
          fromUTC.getFullYear(),
          fromUTC.getMonth(),
          fromUTC.getDate()
        ),
        to: new Date(toUTC.getFullYear(), toUTC.getMonth(), toUTC.getDate()),
      };
    });
  };

  function getDates(startDate: Date, stopDate: Date) {
    let dateArray = new Array();
    let currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

  function getArrDateBasedOnStartDateAndDates(
    startDate: Date,
    unavailableDates: { from: Date; to: Date }[]
  ) {
    // Sort array
    const unavailableDateTimes = unavailableDates.map((date) => {
      return {
        from: new Date(date.from),
        to: new Date(date.to),
      };
    });
    unavailableDateTimes.sort(function (a, b) {
      return a.from.getTime() - b.from.getTime();
    });

    // First and last item in array
    const firstArrItem = unavailableDateTimes[0];
    const lastArrItem = unavailableDateTimes[unavailableDateTimes.length - 1];

    // Calculate
    if (startDate < firstArrItem.from) {
      const dateAvailableArr: Date[] = getDates(startDate, firstArrItem.from);
      return dateAvailableArr;
    } else if (startDate > lastArrItem.to) {
      return;
    } else {
      for (let index = 0; index <= unavailableDateTimes.length - 1; index++) {
        if (
          startDate < unavailableDateTimes[index].from &&
          startDate > unavailableDateTimes[index - 1].to
        ) {
          const dateAvailableArr: Date[] = getDates(
            startDate,
            unavailableDateTimes[index++].from
          );
          return dateAvailableArr;
        }
      }
    }
  }

  const shouldDisableDateEnd = (
    date: any,
    datesDisableRent: UnavailableDates[]
  ) => {
    const dateOption = new Date(date);
    const dateFrom = new Date(startDate);
    const dateFromOption = new Date(
      dateOption.getFullYear(),
      dateOption.getMonth(),
      dateOption.getDate()
    );
    const dateStart = new Date(
      dateFrom.getFullYear(),
      dateFrom.getMonth(),
      dateFrom.getDate()
    );
    if (dateFromOption <= dateStart) return true;
    const disabledDateTimeLocal = getDisabledDateTimeLocal(datesDisableRent);
    if (disabledDateTimeLocal.length === 0) return false;
    let isDisabled: boolean = false;
    const listDateAvailable = getArrDateBasedOnStartDateAndDates(
      dateFrom,
      disabledDateTimeLocal
    );
    if (listDateAvailable) {
      let checkIsDateAvailable = listDateAvailable.some((dateAvailable) => {
        return dateAvailable.toDateString() === dateFromOption.toDateString();
      });
      isDisabled = !checkIsDateAvailable;
    }
    return isDisabled;
  };

  return (
    <>
      <Dialog
        open={true}
        handler={onClose}
        size="sm"
        className="max-w-[300px] md:max-w-[400px] "
        style={{ zIndex: 50 }}
      >
        <DialogHeader className="text-3xl font-bold px-8 text-gradient flex items-center justify-center">
          Rent Now
        </DialogHeader>
        <DialogBody divider className="px-8">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex flex-col items-end justify-end gap-4 w-fit mx-auto">
              <div className="flex items-center justify-center gap-2">
                <p className="font-semibold text-sm md:text-base">
                  Start Date:
                </p>
                <DateTimePicker
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      padding: 1,
                      width: "150px",
                      fontSize: "14px",
                      paddingRight: "0px",
                    },
                    "& .MuiInputBase-root": {
                      paddingRight: "0px",
                    },
                    "& .MuiIconButton-root": {
                      position: "relative",
                      right: "10px",
                      ":hover": {
                        backgroundColor: "rgba(9, 53, 227, 0.3)",
                      },
                    },
                  }}
                  format="HH:mm, DD/MM/YYYY"
                  onChange={(date: any) => setStartDate(date)}
                  shouldDisableDate={(date: any) =>
                    shouldDisableDateStart(date, datesDisableRent)
                  }
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <p className="font-semibold text-sm md:text-base">End Date:</p>
                <DateTimePicker
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      padding: 1,
                      width: "150px",
                      fontSize: "14px",
                      paddingRight: "0px",
                    },
                    "& .MuiInputBase-root": {
                      paddingRight: "0px",
                    },
                    "& .MuiIconButton-root": {
                      position: "relative",
                      right: "10px",
                      ":hover": {
                        backgroundColor: "rgba(9, 53, 227, 0.3)",
                      },
                    },
                  }}
                  format="HH:mm, DD/MM/YYYY"
                  disabled={startDate ? false : true}
                  shouldDisableDate={(date: any) =>
                    shouldDisableDateEnd(date, datesDisableRent)
                  }
                  onChange={(date: any) => setEndDate(date)}
                />
              </div>
            </div>
          </LocalizationProvider>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={onClose} className="mr-1">
            <span>Cancel</span>
          </Button>
          <LoadingButton
            size="large"
            className="transition-all rounded-lg shadow-md"
            loading={isSubmitting}
            color="success"
            onClick={() => onAction()}
            variant="contained"
          >
            <span
              className={`font-bold text-xs ${
                isSubmitting ? "text-transparent" : "text-white"
              }`}
            >
              Check out
            </span>
          </LoadingButton>
        </DialogFooter>
      </Dialog>
    </>
  );
}
