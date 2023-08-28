import { toast } from "react-toastify";

export async function uploadImageToCloudinary(image: File) {
  try {
    let imageURL: string;
    if (
      image &&
      (image.type === "image/png" ||
        image.type === "image/jpg" ||
        image.type === "image/jpeg")
    ) {
      const imageUpload = new FormData();
      imageUpload.append("file", image);
      imageUpload.append("cloud_name", "dmwvl1lok");
      imageUpload.append("upload_preset", "m9fflfsz");

      const uploadCloudinary = await fetch(
        "https://api.cloudinary.com/v1_1/dmwvl1lok/upload",
        {
          method: "POST",
          body: imageUpload,
        }
      );
      const imgData = await uploadCloudinary.json();
      imageURL = imgData.url.toString();
      return imageURL;
    }
  } catch (error) {
    toast.error("Error uploading image");
    console.log(error);
  }
}
