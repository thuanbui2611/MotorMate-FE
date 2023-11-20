import { toast } from "react-toastify";
import { UserDetail } from "../models/User";
import { useRef, useState } from "react";
import { uploadImage } from "../utils/Cloudinary";
import { FieldValues } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";
import { updateProfileAsync } from "../../pages/profile/ProfileSlice";
import { useParams } from "react-router-dom";
import { updateUser } from "../../pages/account/AccountSlice";

interface Props {
  profileUser: UserDetail | null;
}

export default function ProfileInfo({ profileUser }: Props) {
  const [imageUploaded, setImageUploaded] = useState<File | null>();
  const [imageReview, setImageReview] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const [isClickConfirm, setIsClickConfirm] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userLogin = useAppSelector((state) => state.account.userDetail);
  const dispatch = useAppDispatch();

  const handleImageChange = (e: any) => {
    setIsClickConfirm(false);
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Accept only image");
    } else {
      setImageUploaded(file);
      setImageReview({
        name: file.name,
        url: URL.createObjectURL(file),
      });
    }
    //reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const cancelEditAvatar = () => {
    setImageUploaded(null);
    setImageReview(null);
    setIsClickConfirm(true);
  };
  async function changeAvatar() {
    try {
      setIsClickConfirm(true);
      if (imageUploaded) {
        const image = await uploadImage(imageUploaded);
        const formData = {
          username: userLogin?.username,
          firstName: userLogin?.firstName,
          lastName: userLogin?.lastName,
          address: userLogin?.address,
          phoneNumber: userLogin?.phoneNumber,
          image: {
            imageUrl: image?.image,
            publicId: image?.publicId,
          },
          dataOfBirth: userLogin?.dateOfBirth,
        };
        console.log(formData);
        const response = await dispatch(updateProfileAsync(formData));
        if (response.meta.requestStatus === "fulfilled") {
          dispatch(updateUser(response.payload));
        }
      }
    } catch (error: any) {
      toast.error("Error: " + error.message);
    }
  }
  return (
    <>
      <section className="bg-white pb-12">
        <div className="relative mb-20 h-96 bg-color-header flex justify-center items-center ">
          <img
            className="object-cover w-full h-full max-w-[1900px]"
            src={require("../../app/assets/images/logo/logo-MotorMate-large.png")}
            alt=""
          />

          <div className="absolute flex flex-col w-full md:w-fit md:flex-row justify-center bottom-0 left-0 items-center ">
            <div className="relative">
              <img
                className="object-cover w-40 h-40 ml-0 -mb-16 rounded-full md:ml-4 lg:ml-12 lg:-mb-24 lg:w-60 lg:h-60"
                src={
                  imageReview ? imageReview?.url : profileUser?.image?.imageUrl
                }
                alt="Avatar user"
              />
              {imageReview && !isClickConfirm && (
                <div className="absolute flex items-center space-x-2 right-10 -bottom-24 lg:right-20 lg:-bottom-36 w-fit">
                  <svg
                    className="h-8 w-8 lg:h-10 lg:w-10 text-[#14d233] cursor-pointer hover:text-[#11bb2e]"
                    fill="currentColor"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 493.464 493.464"
                    xmlSpace="preserve"
                    stroke="#11d45c"
                    onClick={changeAvatar}
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <g>
                          <path d="M246.736,0C110.692,0,0.004,110.68,0.004,246.732c0,136.06,110.688,246.732,246.732,246.732 c136.048,0,246.724-110.672,246.724-246.732C493.456,110.68,382.78,0,246.736,0z M360.524,208.716L230.98,338.268 c-2.82,2.824-7.816,2.824-10.64,0l-86.908-86.912c-1.412-1.416-2.192-3.3-2.192-5.324c0.004-2.016,0.784-3.912,2.192-5.336 l11.108-11.104c1.412-1.408,3.3-2.18,5.328-2.18c2.016,0,3.908,0.772,5.316,2.18l67.752,67.752c1.5,1.516,3.94,1.516,5.444,0 l110.392-110.392c2.824-2.824,7.828-2.824,10.644,0l11.108,11.124c1.412,1.4,2.208,3.304,2.208,5.308 C362.732,205.412,361.936,207.3,360.524,208.716z"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <svg
                    className="h-8 w-8 lg:h-10 lg:w-10 text-[#fa0000] hover:text-[#e00000] cursor-pointer"
                    fill="currentColor"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 493.456 493.456"
                    xmlSpace="preserve"
                    stroke="#fa0000"
                    onClick={cancelEditAvatar}
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <g>
                          <path d="M246.73,0C110.682,0,0.002,110.684,0.002,246.744c0,136.032,110.68,246.712,246.728,246.712 s246.724-110.68,246.724-246.712C493.454,110.684,382.778,0,246.73,0z M360.258,348.776l-11.112,11.12 c-2.808,2.836-7.82,2.836-10.644,0l-88.68-88.672c-0.728-0.74-1.704-1.136-2.732-1.136c-1.028,0-2.004,0.4-2.732,1.136 L155.682,359.9c-2.82,2.836-7.828,2.836-10.648,0l-11.108-11.12c-1.412-1.404-2.196-3.304-2.196-5.3 c0-2.02,0.784-3.916,2.196-5.344l88.68-88.672c1.508-1.512,1.508-3.948,0-5.452l-88.68-88.68c-1.412-1.416-2.196-3.308-2.196-5.32 c0-2.02,0.784-3.916,2.196-5.328l11.108-11.108c2.82-2.82,7.828-2.82,10.648,0l88.68,88.672c1.444,1.444,4.016,1.444,5.46,0 l88.676-88.676c2.824-2.824,7.836-2.824,10.644,0l11.112,11.112c2.928,2.924,2.928,7.716,0,10.648l-88.692,88.676 c-1.504,1.504-1.504,3.94,0,5.452l88.696,88.672C363.186,341.072,363.186,345.844,360.258,348.776z"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              )}
              {profileUser?.username.toLowerCase() ===
                userLogin?.username.toLowerCase() && (
                <label
                  htmlFor="profileAvatar"
                  className="absolute bottom-0 right-4 flex -mb-14 lg:right-6 lg:-mb-20 h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full p-1 lg:p-2 bg-blue-500 hover:bg-blue-700 text-white"
                >
                  <svg
                    className="fill-current h-4 w-4 lg:h-5 lg:w-5"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                      fill=""
                    />
                  </svg>
                  <input
                    type="file"
                    id="profileAvatar"
                    name="profileAvatar"
                    className="sr-only"
                    onChange={handleImageChange}
                    accept="image/*"
                    ref={fileInputRef}
                  />
                </label>
              )}
            </div>

            <div className="w-fit h-40 ml-0 -mb-32 md:ml-2 lg:ml-4 lg:-mb-48 lg:h-60 flex items-center">
              <div className="text-black font-bold text-center text-2xl lg:text-4xl mt-5 ">
                {profileUser?.fullName}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
