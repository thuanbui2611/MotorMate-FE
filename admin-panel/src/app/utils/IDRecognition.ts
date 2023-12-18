import axios from "axios";

export async function recognizeIdentityCard(image: File) {
  const url = "https://api.fpt.ai/vision/idr/vnm/";
  const apiKey = "S5zRELtBM6taMKjhWrzyt5qeLgF606v8";

  const formData = new FormData();
  formData.append("image", image);

  const headers = {
    "api-key": apiKey,
    "Content-Type": "multipart/form-data",
  };

  try {
    const response = await axios.post(url, formData, { headers });
    // Handle the response here

    console.log(response.data);
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
}
