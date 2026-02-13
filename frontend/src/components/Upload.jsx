import { useState } from "react";
import toast from "react-hot-toast";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setLoading(true);

    try {
      // get upload URL
      const res = await fetch(
        `http://localhost:5000/upload-url?name=${encodeURIComponent(file.name)}`
      );

      if (!res.ok) throw new Error("Failed to get upload URL");

      const { url } = await res.json();

      // upload to S3
      const uploadRes = await fetch(url, {
        method: "PUT",
        body: file,
      });

      if (!uploadRes.ok) throw new Error("Upload failed");

      toast.success("File uploaded successfully");
      setFile(null);

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg 
        border border-white/20 rounded-2xl p-6 text-center">

        <h2 className="text-2xl font-semibold mb-2">Upload your file</h2>
        <p className="text-sm text-gray-300 mb-6">
          Secure & fast cloud upload
        </p>

        <label className="cursor-pointer block border-2 border-dashed 
          border-white/30 rounded-xl p-6 mb-4">
          
          <input
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />

          {!file ? (
            <p className="text-gray-300">📁 Click to choose a file</p>
          ) : (
            <div>
              <p className="truncate">{file.name}</p>
              <p className="text-xs text-gray-400">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}
        </label>

        <button
          onClick={uploadFile}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold
            ${loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600 cursor-pointer"}`}
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </div>
  );
}
