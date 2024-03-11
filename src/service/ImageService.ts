import { Image } from "../interfaces/vendor";
import { BASE_URL, api } from "../utils/api";
import imageCompression from 'browser-image-compression';
import {DealImage} from "../interfaces/deals";

/**
 * Uploads the image to the server for a specific vendor.
 * 
 * @param img - The image file to be uploaded.
 * @param vendorId - The ID of the vendor to associate with the uploaded image.
 * @returns A promise resolving with the uploaded image data.
 */
export const uploadVendorImage = async (img: File, vendorId: string): Promise<Image> => {
  let imgForm;

  try {
    imgForm = new FormData();
    imgForm.append('image', img);
    console.log("Image appended to FormData");
  } catch (error) {
    console.error("Error creating FormData:", error);
  }

  const imgResponse = await fetch(`${BASE_URL}images/vendors/${vendorId}`, {
    method: 'POST',
    body: imgForm,
  });

  // Check if the response content type is JSON
  const contentType = imgResponse.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    if (!imgResponse.ok) {
      const err = await imgResponse.json();
      if (imgResponse.status === 413) {
        throw new Error('Image is too large');
      }
      throw new Error(err.message || 'Error uploading image.');
    }

    const json: Image = await imgResponse.json();
    return json;
  } else {
    // Handle non-JSON responses
    const text = await imgResponse.text();
    throw new Error(`Unexpected response from server: ${text.substring(0, 100)}...`); // Display the first 100 characters of the response
  }
};

export const simpleUploadVendorImage = async (img: File, vendorId: string): Promise<Image> => {
  const imgForm = new FormData();

  imgForm.append('image', img);
  const res = await api.post(`${BASE_URL}images/vendors/${vendorId}`, imgForm);
  if (!res.status.toString().startsWith('2')) {
    const err = res.data;
    if (res.status === 413) {
      throw new Error('Image is too large');
    }
    throw new Error(err.message ?? 'Error uploading image.');
  }
  return res.data;
};

export async function compressImage(file: File, maxSize: number): Promise<File> {
  try {
    const options = {
      maxSizeMB: maxSize / 1024 / 1024, // convert to MB
      useWebWorker: true,
    };
    
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error occurred while compressing image', error);
    throw error; // rethrow the error after logging it
  }
}

export const uploadDealImage = async (img: File, dealId: string) => {
  const imgForm = new FormData();

  imgForm.append('image', img);
  imgForm.append('dealId', dealId);
  const imgResponse = await fetch(`${BASE_URL}images/deals/${dealId}`, {
    method: 'POST',
    body: imgForm,
  });
  if (!imgResponse.status.toString().startsWith('2')) {
    if (imgResponse.status === 413) {
      throw new Error('Image is too large');
    }
  }
  const json: DealImage = await imgResponse.json();
  return json;
};
