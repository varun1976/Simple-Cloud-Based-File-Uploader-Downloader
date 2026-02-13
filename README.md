⚙️ Installation & Setup

1️⃣ Clone Repository
git clone https://github.com/varun1976/Simple-Cloud-Based-File-Uploader-Downloader
cd Simple-Cloud-Based-File-Uploader-Downloader
-----------------------------------------------------------------------------------------------

🔐 Environment Variables

Fill all the AWS S3 Bucket credentials in the .env file in the backend folder
PORT=5000
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_BUCKET_NAME=your_bucket_name
-----------------------------------------------------------------------------------------------------
🖥️ Backend Setup
cd backend
npm install
node server.js

Backend runs on:
http://localhost:5000
-----------------------------------------------------------------------------------------------------
🎨 Frontend Setup
cd frontend
npm install
npm start
