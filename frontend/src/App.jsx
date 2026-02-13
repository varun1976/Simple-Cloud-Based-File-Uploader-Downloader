import { useState } from "react";
import Upload from "./components/Upload.jsx";
import Download from "./components/download.jsx";
import { Toaster } from 'react-hot-toast';

function App() {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-black">

        {/* Main Card */}
        <div className="w-180 h-115 rounded-3xl 
        bg-white/10 backdrop-blur-xl 
        border border-white/20 
        shadow-[0_0_40px_rgba(255,255,255,0.1)]
        text-white overflow-hidden">

          {/* Header */}
          <div className="relative flex">
            {/* Upload Tab */}
            <button
              onClick={() => setActiveTab("upload")}
              className={`w-1/2 py-4 text-lg font-semibold transition-all duration-300
              ${activeTab === "upload"
                  ? "text-black"
                  : "text-gray-300 hover:text-white cursor-pointer"}
            `}
            >
              Upload
            </button>

            {/* Download Tab */}
            <button
              onClick={() => setActiveTab("download")}
              className={`w-1/2 py-4 text-lg font-semibold transition-all duration-300 cursor-pointer
              ${activeTab === "download"
                  ? "text-black"
                  : "text-gray-300 hover:text-white"}
            `}
            >
              Download
            </button>

            {/* Sliding Indicator */}
            <div
              className={`absolute bottom-0 h-full w-1/2 bg-white rounded-t-3xl
              transition-transform duration-300 ease-in-out
              ${activeTab === "download" ? "translate-x-full" : "translate-x-0"}
            `}
              style={{ zIndex: -1 }}
            />
          </div>

          {/* Content */}
          <div className="p-8 h-full">
            <div className="h-full rounded-2xl bg-black/40 p-6">
              {activeTab === "upload" ? <Upload /> : <Download />}
            </div>
          </div>

        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
