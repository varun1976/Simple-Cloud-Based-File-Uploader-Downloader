import express from "express";
import AWS from "aws-sdk";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// / AWS S3 CONFIG
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

// GET UPLOAD PRESIGNED URL
app.get("/upload-url", (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Missing file name" });
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: name,
    Expires: 60
  };

  const url = s3.getSignedUrl("putObject", params);
  res.json({ url });
});

// LIST ALL FILES IN S3
app.get("/files", async (req, res) => {
  try {
    const data = await s3
      .listObjectsV2({
        Bucket: process.env.AWS_BUCKET_NAME
      })
      .promise();

    const files = data.Contents.map((file) => ({
      name: file.Key,
      size: file.Size,
      lastModified: file.LastModified
    }));

    res.json(files);
  } catch (err) {
    res.status(500).json({ error: "Failed to list files" });
  }
});

// GET DOWNLOAD PRESIGNED URL
app.get("/download-url", (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Missing file name" });
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: name,
    Expires: 60
  };

  const url = s3.getSignedUrl("getObject", params);
  res.json({ url });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
