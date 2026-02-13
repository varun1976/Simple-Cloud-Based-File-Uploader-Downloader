## ⚙️ Installation & Setup

```bash
# 1️⃣ Clone Repository
git clone https://github.com/varun1976/Simple-Cloud-Based-File-Uploader-Downloader.git
cd Simple-Cloud-Based-File-Uploader-Downloader

# 2️⃣ .env Configuration
Fill the .env file located in the backend folder with your required AWS S3 bucket credentials.

PORT=5000
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_BUCKET_NAME=your_bucket_name

# 3️⃣ Backend Setup
cd backend
npm install
node server.js
# Backend runs on http://localhost:5000

# 4️⃣ Frontend Setup (open a new terminal)
cd frontend
npm install
npm start
```
