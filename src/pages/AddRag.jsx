import { useState } from "react";

export default function RagUpload() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chunks, setChunks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const BASE_URI = import.meta.env.VITE_BACKEND_URI;

  // Upload PDF
  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${BASE_URI}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert("Upload failed");
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          📚 RAG Assistant
        </h1>
        <p className="text-gray-500 mt-2">
          Upload PDFs and chat with your documents
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        
        {/* Upload Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-primary">
          <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-2 rounded-lg mb-3"
          />

          {file && (
            <p className="text-sm text-gray-600 mb-3">
              Selected: {file.name}
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-primary text-black font-semibold py-2 rounded-lg hover:scale-105 transition disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}