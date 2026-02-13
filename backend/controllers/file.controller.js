export const downloader=async(req, res) => {
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
}

export const uploader=async(req, res) => {
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
}

export const listFiles=async(req, res) => {
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
}