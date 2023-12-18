import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
import { Image } from "../models/Image";

const apiSecret = process.env.REACT_APP_CLOUDINARY_API_SECRET;
const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;
const cloudName = process.env.REACT_APP_CLOUDINARY_NAME;
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOADPRESET;

export async function uploadImage(image: File): Promise<Image | null> {
  try {
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
      const imgData = await uploadCloudinary.json();
      let response: Image = {
        image: imgData.url.toString(),
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

export async function uploadImages(files: FileList): Promise<Image[] | null> {
  try {
    const results: Image[] = [];
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
      results.push({
        image: data.secure_url,
        publicId: data.public_id,
      });
    }
    return results;
  } catch (error) {
    console.error("Error uploading images:", error);
    return null;
  }
}

export async function deleteImage(publicId: string) {
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

export async function deleteImages(images: Image[]) {
  // if (!images.map((image) => image.publicId)) return console.log("No public id");
  try {
    for (let i = 0; i < images.length; i++) {
      const timestamp = new Date().getTime();
      const signature = CryptoJS.SHA1(
        `public_id=${images[i].publicId}&timestamp=${timestamp}${apiSecret}`
      ).toString();
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            public_id: images[i].publicId,
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
    }
  } catch (error: any) {
    throw new Error("Image deletion failed:", error);
  }
}

//error CORS
// export async function deleteImages(publicIds: string[]) {
//   try {
//     const timestamp = new Date().getTime();
//     const corsUrl = "https://cors-anywhere.herokuapp.com/";
//     const signature = CryptoJS.SHA1(
//       `public_ids=${publicIds.join(",")}&timestamp=${timestamp}${apiSecret}`
//     ).toString();
//     console.log("publicIds: ", publicIds);
//     console.log("timestamp: ", timestamp);
//     console.log("signature: ", signature);
//     const response = await fetch(
//       corsUrl +
//         `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/destroy`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-Requested-With": "XMLHttpRequest",
//         },
//         body: JSON.stringify({
//           public_ids: publicIds,
//           api_key: apiKey,
//           signature: signature,
//           timestamp: timestamp,
//         }),
//       }
//     );
//     if (response.ok) {
//       const data = await response.json();
//       console.log("Delete images success data: ", data);
//       return data;
//     } else {
//       throw new Error("Unable to delete image");
//     }
//   } catch (error: any) {
//     throw new Error("Image deletion failed:", error);
//   }
// }
