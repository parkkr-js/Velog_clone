import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_S3_REGION,
});
const s3 = new AWS.S3();

const uploadToS3 = async (file, isImage = false) => {
  const returnData = {};
  const fileName = "velog/" + `${Date.now()}.${file.name.split(".").pop()}`;
  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET,
    Key: fileName, 
    Body: file,
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    returnData["key"] = uploadResult.Key;
    returnData["downloadLink"] = uploadResult.Location;
    if (isImage) {
      const imageUrl = `https://${process.env.REACT_APP_S3_BUCKET}.s3.amazonaws.com/${uploadResult.Key}`;
      returnData["imageUrl"] = imageUrl;
    }
  } catch (error) {
    console.error("Error uploading files to S3:", error);
    throw error;
  }

  return returnData;
};


const deleteFilesInS3 = async (fileKeys) => {
  try {
    const deleteObjects = fileKeys.map((fileKey) => ({ Key: fileKey }));
    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Delete: { Objects: deleteObjects },
    };

    await s3.deleteObjects(params).promise();
    console.log("Successfully deleted files from S3:", fileKeys);
  } catch (error) {
    console.error("Error deleting files from S3:", error);
    throw error; 
  }
};

export { uploadToS3, deleteFilesInS3 };
