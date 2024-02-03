import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_S3_REGION,
});
const s3 = new AWS.S3();

const uploadToS3 = async (file, isImage = false) => {
    const returnData = {};
    // 파일 확장자를 포함한 전체 파일 이름을 생성합니다.
    const fileName = `${Date.now()}_${file.name}`;
    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: fileName, // 생성한 파일 이름을 사용합니다.
      Body: file,
    };
  
    try {
      const uploadResult = await s3.upload(params).promise();
      returnData["downloadLink"] = uploadResult.Location;
      returnData["fileName"] = fileName; // 파일 이름을 반환 데이터에 추가합니다.
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
