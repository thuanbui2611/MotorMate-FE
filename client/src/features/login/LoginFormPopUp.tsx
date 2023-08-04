import { FormEvent, useState } from "react";

interface Props {
  onClose: () => void;
}
export default function LoginForm(props: Props) {
  const [success, setSuccess] = useState(false);
  const [notify, setNotify] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // simulate form submission
    const submitSuccess = true; // replace with your form submission logic
    if (submitSuccess) {
      setSuccess(true);
      setTimeout(() => {
        props.onClose();
        setSuccess(false);
      }, 2000); // close the popup form after 2 seconds
    } else {
      setNotify(true);
    }
  };

  const handleCloseLoginForm = (e: any) => {
    if (e.target.id === "wrapper") {
      props.onClose();
    }
  };

  return (
    <>
      <div
        id="wrapper"
        onClick={handleCloseLoginForm}
        className="min-h-screen bg-opacity-60 fixed overflow-hidden bg-gray-100 py-6 flex flex-col justify-center sm:py-12 top-0 right-0 bottom-0 left-0 items-center z-50"
      >
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <button
              id="closeButton"
              className="close-btn absolute top-10 right-10"
              onClick={props.onClose}
            >
              <svg
                height="30px"
                width="30px"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="-2.6 -2.6 31.20 31.20"
                xmlSpace="preserve"
                fill="#000000"
                stroke="#000000"
                transform="matrix(1, 0, 0, 1, 0, 0)"
                stroke-width="0.26"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <path
                      style={{ fill: "#f51414" }}
                      d="M21.125,0H4.875C2.182,0,0,2.182,0,4.875v16.25C0,23.818,2.182,26,4.875,26h16.25 C23.818,26,26,23.818,26,21.125V4.875C26,2.182,23.818,0,21.125,0z M18.78,17.394l-1.388,1.387c-0.254,0.255-0.67,0.255-0.924,0 L13,15.313L9.533,18.78c-0.255,0.255-0.67,0.255-0.925-0.002L7.22,17.394c-0.253-0.256-0.253-0.669,0-0.926l3.468-3.467 L7.221,9.534c-0.254-0.256-0.254-0.672,0-0.925l1.388-1.388c0.255-0.257,0.671-0.257,0.925,0L13,10.689l3.468-3.468 c0.255-0.257,0.671-0.257,0.924,0l1.388,1.386c0.254,0.255,0.254,0.671,0.001,0.927l-3.468,3.467l3.468,3.467 C19.033,16.725,19.033,17.138,18.78,17.394z"
                    ></path>{" "}
                  </g>{" "}
                </g>
              </svg>
            </button>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
              <div>
                <h1 className="text-2xl font-semibold">
                  Login Form with Floating Labels
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative flex items-center justify-center">
                    <button className="bg-blue-500 text-white rounded-md px-2 py-1 ">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
