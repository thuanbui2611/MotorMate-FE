import { useEffect, useState } from "react";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { LoadingButton } from "@mui/lab";
import {
  CardNumberElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";
import { UserDetail } from "../models/User";
import {
  removeVehicleInCart,
  resetSelectedVehicles,
} from "../../pages/cart/CartSlice";

type Focused = "name" | "number" | "expiry" | "cvc" | "";
interface Props {
  userLogin: UserDetail;
}
export default function PaymentForm({ userLogin }: Props) {
  // const [state, setState] = useState({
  //   number: "",
  //   expiry: "",
  //   cvc: "",
  //   name: "",
  //   focus: "",
  // });
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const { selectedVehicles } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  //For react-card
  // const handleInputChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setState((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleInputFocus = (e: any) => {
  //   setState((prev) => ({ ...prev, focus: e.target.name }));
  // };
  //End of for react-card
  const handleSubmit = async (event: any) => {
    debugger;
    setLoading(true);
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: process.env.REACT_APP_CLOUDINARY_BASE_URL + "/bill",
      },
    });

    setLoading(false);

    if (error) {
      toast.error("Payment failed, please try again!");
      console.log("Payment failed: ", error);
    } else {
      // Redirected to  `return_url`.
      // toast.success("Payment success");
      //remove vehicle from cart and reset selected payment vehicle
      selectedVehicles.forEach((shop) => {
        shop.vehicles.forEach((vehicle) => {
          dispatch(removeVehicleInCart(vehicle.vehicleId));
        });
      });
      dispatch(resetSelectedVehicles());
    }
  };
  useEffect(() => {
    let total = 0;
    selectedVehicles.forEach((shop) => {
      shop.vehicles.forEach((vehicle) => {
        const { price, pickUpDateTime, dropOffDateTime } = vehicle;
        const pricePerDay = +price;
        const startDate = new Date(pickUpDateTime);
        const endDate = new Date(dropOffDateTime);
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        const numberOfDays = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days
        const roundedNumberOfDays =
          numberOfDays < 4.5
            ? Math.floor(numberOfDays)
            : Math.ceil(numberOfDays);
        total += pricePerDay * roundedNumberOfDays;
      });
    });
    setTotalPayment(total);
  }, [selectedVehicles]);
  return (
    <>
      <div className="max-w-screen-lg bg-white rounded-lg border border-gray-300 p-5 shadow-md">
        <div className="flex items-start justify-center flex-col">
          <div className="font-bold text-3xl pb-3 text-center text-gradient w-full">
            Payment
          </div>
          <div className="border-b-[1px] border-r w-full border-gray-300"></div>
          {/* <div className="flex flex-col items-start justify-center py-2">
            <div className="font-bold text-lg">Address</div>
            <div className=" text-sm">Address information</div>
          </div>
          <div className="border-b-[1px] border-r w-full border-gray-300"></div> */}
          <div className="flex flex-col items-start justify-center py-1">
            <div className="flex flex-col justify-center items-center gap-6 mt-4">
              {/* <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus as Focused}
              /> */}
              <form onSubmit={handleSubmit}>
                <LinkAuthenticationElement
                  options={{
                    defaultValues: {
                      email: userLogin.email,
                    },
                  }}
                />

                <PaymentElement />
                {/* <PaymentElement /> */}
                <div className="border-b-[1px] border-r w-full border-gray-300 mt-3"></div>
                <div className="flex items-center justify-end pt-3 w-full">
                  <div className="font-bold text-lg">Total:</div>
                  <div className="font-bold text-xl text-green-500 ml-2">
                    {totalPayment.toLocaleString()} VND
                  </div>
                </div>
                <div className="flex items-center justify-center gap-6 mt-3">
                  <LoadingButton
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                    className="text-white rounded-lg w-20 text-center"
                    variant="contained"
                    color="error"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </LoadingButton>
                  <LoadingButton
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                    type="submit"
                    className="text-white rounded-lg w-20 text-center"
                    variant="contained"
                    loading={loading}
                    disabled={!stripe}
                    color="info"
                  >
                    Pay
                  </LoadingButton>
                </div>
              </form>

              {/* <form className="grid grid-cols-2 gap-2">
                <TextField
                  className="w-full px-4 py-3 bg-transparent rounded-lg border-none"
                  size="small"
                  sx={{
                    "& label.Mui-focused": {
                      color: "#FF7E06",
                    },
                    "& .MuiOutlinedInput-input": {
                      boxShadow: "none",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#6B7280",
                      },
                      "&:hover fieldset": {
                        borderColor: "#FF7E06",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#FF7E06",
                      },
                    },
                  }}
                  placeholder="4111 1111 1111 1111"
                  variant="outlined"
                  label="Card Number"
                  type="tel"
                  name="number"
                  value={state.number}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    inputComponent: StripeInput,
                    inputProps: {
                      component: CardNumberElement,
                    },
                  }}
                />

                <TextField
                  className="w-full px-4 py-3 bg-transparent rounded-lg border-none"
                  size="small"
                  sx={{
                    "& label.Mui-focused": {
                      color: "#FF7E06",
                    },
                    "& .MuiOutlinedInput-input": {
                      boxShadow: "none",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#6B7280",
                      },
                      "&:hover fieldset": {
                        borderColor: "#FF7E06",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#FF7E06",
                      },
                    },
                  }}
                  placeholder="Full name of card holder"
                  variant="outlined"
                  label="Name"
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  //   {...register("firstName", {
                  //     required: "First name is required",
                  //     pattern: {
                  //       value:
                  //         /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b)(?!.*[!@#$%^&*()])(?!.*[-+=/\\|[\]{}:;"',.?]).*$/i,
                  //       message: "Invalid name",
                  //     },
                  //   })}
                />

                <TextField
                  className="w-full px-4 py-3 bg-transparent rounded-lg border-none"
                  size="small"
                  sx={{
                    "& label.Mui-focused": {
                      color: "#FF7E06",
                    },
                    "& .MuiOutlinedInput-input": {
                      boxShadow: "none",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#6B7280",
                      },
                      "&:hover fieldset": {
                        borderColor: "#FF7E06",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#FF7E06",
                      },
                    },
                  }}
                  placeholder="MM/YY"
                  variant="outlined"
                  label="Expiry"
                  type="text"
                  name="expiry"
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  //   {...register("firstName", {
                  //     required: "First name is required",
                  //     pattern: {
                  //       value:
                  //         /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b)(?!.*[!@#$%^&*()])(?!.*[-+=/\\|[\]{}:;"',.?]).*$/i,
                  //       message: "Invalid name",
                  //     },
                  //   })}
                />

                <TextField
                  className="w-full px-4 py-3 bg-transparent rounded-lg border-none"
                  size="small"
                  sx={{
                    "& label.Mui-focused": {
                      color: "#FF7E06",
                    },
                    "& .MuiOutlinedInput-input": {
                      boxShadow: "none",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#6B7280",
                      },
                      "&:hover fieldset": {
                        borderColor: "#FF7E06",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#FF7E06",
                      },
                    },
                  }}
                  placeholder="123"
                  variant="outlined"
                  label="CVC/CCV"
                  type="text"
                  name="cvc"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  //   {...register("firstName", {
                  //     required: "First name is required",
                  //     pattern: {
                  //       value:
                  //         /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b)(?!.*[!@#$%^&*()])(?!.*[-+=/\\|[\]{}:;"',.?]).*$/i,
                  //       message: "Invalid name",
                  //     },
                  //   })}
                />
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
