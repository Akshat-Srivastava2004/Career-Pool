import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import process from "process";
//Configure Cloudinary outside the function
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure:true
// });

cloudinary.config({ 
    cloud_name: 'dckghjaen', 
    api_key: '284443345373777', 
    api_secret: 'kone0OvtBr_rPZr_e-6n9rQe9pc',
    secure: true
  });

const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("\n\n -- inside the uploadOnCloudinary function---\n");
    console.log(localFilePath);
    console.log(process.env.CLOUDINARY_API_KEY);

    if (!localFilePath) {
      console.error("Local file path is missing.");
      return null;
    }
    console.log("the local file path is missing",localFilePath)

    // Upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("localfilepath of cloudinary".response);

    // File has been uploaded successfully
    console.log("File is uploaded on Cloudinary:", response.url);

    // Remove the locally saved temporary file
    // fs.unlinkSync(localFilePath);
    fs.unlink(localFilePath, (err) => {
      if (err) {
        console.error("Error deleting local file:", err);
      } else {
        console.log("Local file deleted successfully:", localFilePath);
      }
    });
    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);

   
    fs.unlink(localFilePath, (err) => {
      if (err) {
        console.error("Error deleting local file after failure:", err);
      } else {
        console.log("Local file deleted after failed upload:", localFilePath);
      }
    });
    // Return an object with a null 'url' property or handle the error appropriately
    return { url: null };
  }
};

export { uploadOnCloudinary };
