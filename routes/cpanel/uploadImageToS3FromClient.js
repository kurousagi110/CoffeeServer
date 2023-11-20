// const { uploadData } = require("aws-amplify/storage");
// const { v4: uuidv4 } = require("uuid");

//  const uploadFiles = async ({ files }) => {
//   try {
//     const uploadPromises = files.map(async (file) => {
//       const result = await uploadData({
//         key: uuidv4(),
//         data: file,
//         options: {
//           accessLevel: "guest", // Change this according to your requirements
//         //   bucket: "public-coffeelove", // Change this according to your requirements
//         },
//       });
//       console.log(`Succeeded for :`, result);
//       return { hinh_anh_sp: result };
//     });

//     // Wait for all uploads to complete
//     const uploadResults = await Promise.all(uploadPromises);

//     console.log("All uploads completed:", uploadResults);
//     return uploadResults;
//   } catch (error) {
//     console.log("Error:", error);
//   }
// };

const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs');

// Configure AWS SDK
AWS.config.update({
  accessKeyId: "AKIAQU2DARM5RIQTC7OW",
  secretAccessKey: "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",
  region: "ap-southeast-1",
});

// Create an S3 instance
const s3 = new AWS.S3();

// Function to upload an image to S3
const uploadImageToS3 = async (filePath) => {
  console.log("FILE PATH: ", filePath)
  const fileContent = fs.readFileSync(filePath);
  const params = {
    Bucket: "coffeebe8c278ce734224e64a187054b5221b559221332-dev/public",
    Key: uuidv4(),
    Body: fileContent,
    ContentType: "image/jpeg", // Adjust the content type based on your file type
  
  };

  try {
    const result = await s3.upload(params).promise();
    console.log(`Image uploaded successfully.`, result);
    
    const url = `https://coffeebe8c278ce734224e64a187054b5221b559221332-dev.s3.ap-southeast-1.amazonaws.com/${result.key}`
    return {hinh_anh_sp: url}
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error;
  }
};

module.exports = { uploadImageToS3 };
