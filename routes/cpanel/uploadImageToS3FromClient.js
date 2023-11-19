const { uploadData } = require("aws-amplify/storage");
const { v4: uuidv4 } = require("uuid");

 const uploadFiles = async ({ files }) => {
  try {
    const uploadPromises = files.map(async (file) => {
      const result = await uploadData({
        key: uuidv4(),
        data: file,
        options: {
          accessLevel: "guest", // Change this according to your requirements
        //   bucket: "public-coffeelove", // Change this according to your requirements
        },
      });
      console.log(`Succeeded for :`, result);
      return { hinh_anh_sp: result };
    });

    // Wait for all uploads to complete
    const uploadResults = await Promise.all(uploadPromises);

    console.log("All uploads completed:", uploadResults);
    return uploadResults;
  } catch (error) {
    console.log("Error:", error);
  }
};

module.exports = {uploadFiles};
