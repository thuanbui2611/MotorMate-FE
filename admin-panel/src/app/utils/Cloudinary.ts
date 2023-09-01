import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

const apiSecret = process.env.REACT_APP_CLOUDINARY_API_SECRET;
const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;
const cloudName = process.env.REACT_APP_CLOUDINARY_NAME;
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOADPRESET;

export async function uploadImage(image: File) {
  try {
    // if (
    //   image &&
    //   (image.type === "image/png" ||
    //     image.type === "image/jpg" ||
    //     image.type === "image/jpeg")
    // ) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("cloud_name", cloudName as string);
    formData.append("upload_preset", uploadPreset as string);
    const uploadCloudinary = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (uploadCloudinary.ok) {
      console.log(uploadCloudinary);
      const imgData = await uploadCloudinary.json();
      console.log("imgData to json: ", imgData);
      console.log("publid id: ", imgData.public_id);
      let response = {
        url: imgData.url.toString(),
        publicId: imgData.public_id.toString(),
      };
      return response;
    } else {
      throw new Error("Error when uploading image");
    }
  } catch (error) {
    toast.error("Error when uploading image");
    console.log(error);
    return null;
  }
}
export async function uploadImages(files: FileList) {
  try {
    const results = [];
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", uploadPreset as string);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Unable to upload image");
      }
      const data = await response.json();
      console.log(`Image ${i + 1} uploaded successfully:`, data.secure_url);
      results.push({
        url: data.secure_url,
        publicId: data.public_id,
      });
    }
    return results;
  } catch (error) {
    console.error("Error uploading images:", error);
  }
}

export async function deleteImage(publicId: string) {
  console.log("Start delete: ");
  if (!publicId) return console.log("No public id");
  try {
    const timestamp = new Date().getTime();
    const signature = CryptoJS.SHA1(
      `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
    ).toString();
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_id: publicId,
          signature: signature,
          api_key: apiKey,
          timestamp: timestamp,
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("Delete image success data: ", data);
      return data;
    } else {
      throw new Error("Unable to delete image");
    }
  } catch (error: any) {
    throw new Error("Image deletion failed:", error);
  }
}

export async function deleteImages(publicIds: string[]) {
  try {
    const timestamp = new Date().getTime();
    const signature = CryptoJS.SHA1(
      `public_ids=${publicIds.join(",")}&timestamp=${timestamp}${apiSecret}`
    ).toString();
    console.log("publicIds: ", publicIds);
    console.log("timestamp: ", timestamp);
    console.log("signature: ", signature);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/destroy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({
          public_ids: publicIds,
          api_key: apiKey,
          signature: signature,
          timestamp: timestamp,
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("Delete images success data: ", data);
      return data;
    } else {
      throw new Error("Unable to delete image");
    }
  } catch (error: any) {
    throw new Error("Image deletion failed:", error);
  }
}
