import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_S3_REGION,
});
const s3 = new AWS.S3();

const uploadToS3 = async (file, isImage = false) => {
    console.log("Bucket Name:", process.env.REACT_APP_S3_BUCKET);

    const returnData = {
        
    };
    const params = {
        Bucket: process.env.REACT_APP_S3_BUCKET, // Ensure this value is not undefined
        Key: "upload/" + `${Date.now()}.${file.name.split('.').pop()}`, // Adding file extension dynamically
        Body: file,
    };
    
    try{
        const uploadResult = await s3.upload(params).promise();
        returnData["downloadLink"] = uploadResult.Location;
        if(isImage){
            const imageUrl = `https://${process.env.REACT_APP_S3_BUCKET}.s3.amazonaws.com/${uploadResult.Key}`;
            returnData["imageUrl"] = imageUrl;
        }
    } catch(error){
        console.error("Error uploading files to S3:", error);
        throw error;
    }

    return returnData;
}

const deleteFilesInS3 = async (fileKeys) => {
    try {
        const deleteObjects = fileKeys.map((fileKey) => ({ Key: fileKey }));
        const params = {
            Bucket: process.env.REACT_APP_S3_BUCKET, // Specify the S3 bucket name
            Delete: { Objects: deleteObjects },
        };

        await s3.deleteObjects(params).promise();
        console.log("Successfully deleted files from S3:", fileKeys);
    } catch (error) {
        console.error("Error deleting files from S3:", error);
        throw error; // Re-throw the error for better error handling
    }
  }

export {uploadToS3, deleteFilesInS3};