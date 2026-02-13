import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Download() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/files")
      .then((res) => res.json())
      .then((data) => setFiles(data));
  }, []);

  const downloadFile = async (fileName) => {
    const res = await fetch(
      `http://localhost:5000/download-url?name=${fileName}`
    );
    const { url } = await res.json();
    window.open(url, "_blank");
    toast.success("Download started");
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div
        className="w-full max-w-md bg-white/10 backdrop-blur-lg
        border border-white/20 rounded-2xl p-6"
      >
        {/* Header */}
        <h2 className="text-2xl font-semibold mb-1">Download files</h2>
        <p className="text-sm text-gray-300 mb-4">
          Click to securely download
        </p>

        {/* Empty State */}
        {files.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            📂 No Files Available
          </div>
        )}

        {/* File List */}
        <ul className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {files.map((file) => (
            <li
              key={file.name}
              className="flex items-center justify-between
              bg-black/40 rounded-xl p-3
              hover:bg-black/60 transition"
            >
              <div className="flex items-center gap-3 max-w-[70%]">
                <span className="text-xl">📄</span>
                <div className="truncate">
                  <div className="truncate">{file.name}</div>
                  <div className="text-xs text-gray-400">
                    {(file.size / 1024).toFixed(2)} KB
                  </div>
                </div>
              </div>

              <button
                onClick={() => downloadFile(file.name)}
                className="bg-indigo-500 px-4 py-1.5 rounded-lg text-sm
                hover:bg-indigo-600 active:scale-95 transition cursor-pointer"
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
