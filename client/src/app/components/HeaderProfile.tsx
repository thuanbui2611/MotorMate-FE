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
                    className="h-8 w-8 lg:h-10 lg:w-10 text-[#54B265] hover:text-[#2b873c] cursor-pointer"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 506.4 506.4"
                    xmlSpace="preserve"
                    fill="#000000"
                    onClick={changeAvatar}
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <circle
                        fill="currentColor"
                        cx="253.2"
                        cy="253.2"
                        r="249.2"
                      ></circle>
                      <path
                        style={{ fill: "#F4EFEF" }}
                        d="M372.8,200.4l-11.2-11.2c-4.4-4.4-12-4.4-16.4,0L232,302.4l-69.6-69.6c-4.4-4.4-12-4.4-16.4,0L134.4,244c-4.4,4.4-4.4,12,0,16.4l89.2,89.2c4.4,4.4,12,4.4,16.4,0l0,0l0,0l10.4-10.4l0.8-0.8l121.6-121.6C377.2,212.4,377.2,205.2,372.8,200.4z"
                      ></path>
                      <path d="M253.2,506.4C113.6,506.4,0,392.8,0,253.2S113.6,0,253.2,0s253.2,113.6,253.2,253.2S392.8,506.4,253.2,506.4z M253.2,8C118,8,8,118,8,253.2s110,245.2,245.2,245.2s245.2-110,245.2-245.2S388.4,8,253.2,8z"></path>
                      <path d="M231.6,357.2c-4,0-8-1.6-11.2-4.4l-89.2-89.2c-6-6-6-16,0-22l11.6-11.6c6-6,16.4-6,22,0l66.8,66.8L342,186.4c2.8-2.8,6.8-4.4,11.2-4.4c4,0,8,1.6,11.2,4.4l11.2,11.2l0,0c6,6,6,16,0,22L242.8,352.4C239.6,355.6,235.6,357.2,231.6,357.2z M154,233.6c-2,0-4,0.8-5.6,2.4l-11.6,11.6c-2.8,2.8-2.8,8,0,10.8l89.2,89.2c2.8,2.8,8,2.8,10.8,0l132.8-132.8c2.8-2.8,2.8-8,0-10.8l-11.2-11.2c-2.8-2.8-8-2.8-10.8,0L234.4,306c-1.6,1.6-4,1.6-5.6,0l-69.6-69.6C158,234.4,156,233.6,154,233.6z"></path>
                    </g>
                  </svg>
                  <svg
                    className="h-8 w-8 lg:h-10 lg:w-10 text-[#DF5C4E] hover:text-[#ab4338] cursor-pointer"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 506.4 506.4"
                    xmlSpace="preserve"
                    fill="#000000"
                    onClick={cancelEditAvatar}
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <circle
                        fill="currentColor"
                        cx="253.2"
                        cy="253.2"
                        r="249.2"
                      ></circle>
                      <path
                        style={{ fill: "#F4EFEF" }}
                        d="M281.6,253.2l90.8-90.8c4.4-4.4,4.4-12,0-16.4l-11.2-11.2c-4.4-4.4-12-4.4-16.4,0L254,225.6 l-90.8-90.8c-4.4-4.4-12-4.4-16.4,0L135.6,146c-4.4,4.4-4.4,12,0,16.4l90.8,90.8L135.6,344c-4.4,4.4-4.4,12,0,16.4l11.2,11.6 c4.4,4.4,12,4.4,16.4,0l90.8-90.8l90.8,90.8c4.4,4.4,12,4.4,16.4,0l11.2-11.6c4.4-4.4,4.4-12,0-16.4L281.6,253.2z"
                      ></path>
                      <path d="M253.2,506.4C113.6,506.4,0,392.8,0,253.2S113.6,0,253.2,0s253.2,113.6,253.2,253.2S392.8,506.4,253.2,506.4z M253.2,8 C118,8,8,118,8,253.2s110,245.2,245.2,245.2s245.2-110,245.2-245.2S388.4,8,253.2,8z"></path>
                      <path d="M352.8,379.6c-4,0-8-1.6-11.2-4.4l-88-88l-88,88c-2.8,2.8-6.8,4.4-11.2,4.4c-4,0-8-1.6-11.2-4.4L132,364 c-2.8-2.8-4.4-6.8-4.4-11.2c0-4,1.6-8,4.4-11.2l88-88l-88-88c-2.8-2.8-4.4-6.8-4.4-11.2c0-4,1.6-8,4.4-11.2l11.2-11.2 c6-6,16.4-6,22,0l88,88l88-88c2.8-2.8,6.8-4.4,11.2-4.4l0,0c4,0,8,1.6,11.2,4.4l11.2,11.2c6,6,6,16,0,22l-88,88l88,88 c2.8,2.8,4.4,6.8,4.4,11.2c0,4-1.6,8-4.4,11.2l-11.2,11.2C360.8,378,357.2,379.6,352.8,379.6L352.8,379.6z M253.6,277.2 c1.2,0,2,0.4,2.8,1.2l90.8,90.8c1.6,1.6,3.2,2.4,5.6,2.4l0,0c2,0,4-0.8,5.6-2.4l11.6-11.6c1.6-1.6,2.4-3.2,2.4-5.6 c0-2-0.8-4-2.4-5.6l-90.8-90.8c-0.8-0.8-1.2-1.6-1.2-2.8s0.4-2,1.2-2.8l90.8-90.8c2.8-2.8,2.8-8,0-10.8l-11.2-11.2 c-1.6-1.6-3.2-2.4-5.6-2.4l0,0c-2,0-4,0.8-5.6,2.4L256.8,228c-1.6,1.6-4,1.6-5.6,0l-90.8-90.8c-2.8-2.8-8-2.8-10.8,0L138,148.4 c-1.6,1.6-2.4,3.2-2.4,5.6s0.8,4,2.4,5.6l90.8,90.8c1.6,1.6,1.6,4,0,5.6L138,346.8c-1.6,1.6-2.4,3.2-2.4,5.6c0,2,0.8,4,2.4,5.6 l11.6,11.6c2.8,2.8,8,2.8,10.8,0l90.8-90.8C251.6,277.6,252.4,277.2,253.6,277.2z"></path>
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
