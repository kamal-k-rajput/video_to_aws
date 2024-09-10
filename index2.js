// Import required AWS SDK clients and commands for Node.js
require("dotenv").config();

const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

// Set the region and credentials (make sure to replace with your details)
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create an S3 client
const s3 = new AWS.S3();

// Define the function to upload the video
async function uploadVideoToS3(filePath) {
  try {
    // Read the file from the file system
    const fileContent = fs.readFileSync(filePath);

    // Extract the file name from the file path
    const fileName = path.basename(filePath);

    // Set S3 upload parameters
    const params = {
      Bucket: process.env.BUCKET_NAME, // replace with your bucket name
      Key: `videos/${fileName}`, // File location in the bucket
      Body: fileContent, // File content to upload
      ContentType: "video/mp4", // Content type of the file
      ACL: "public-read", // Optional: Set permissions for the uploaded file
    };

    // Upload the video to S3
    const data = await s3.upload(params).promise();

    console.log(`File uploaded successfully. ${data.Location}`);
  } catch (err) {
    console.error("Error uploading file:", err);
  }
}

// Call the function and provide the video file path
const videoFilePath = "./path-to-your-video.mp4";
uploadVideoToS3(videoFilePath);
