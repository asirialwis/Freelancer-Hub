import React, { useEffect, useState } from "react";
import client from "../../lib/appwrite";
import { Storage } from "appwrite";
import api from "../../auth/api";

const Upload = () => {
  const [img, setImg] = useState<File | undefined>();
  const [video, setVideo] = useState<File | undefined>();
  const [fileUrls, setFileUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const storage = new Storage(client);

  useEffect(() => {
    if (video) uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    if (img) uploadFile(img, "imgUrl");
  }, [img]);

  const uploadFile = async (file: File, fileType: string) => {
    setLoading(true);
    try {
      const fileId = `${Date.now()}-${file.name}`;
      const response = await storage.createFile("6748a0a2001b4a852b49", fileId, file);
      const fileUrl = storage.getFileView("6748a0a2001b4a852b49", response.$id);

      setFileUrls((prev) => ({
        ...prev,
        [fileType]: fileUrl,
      }));
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (file: File | undefined, setState: React.Dispatch<React.SetStateAction<File | undefined>>) => {
    if (file && file.size <= 10 * 1024 * 1024) {
      setState(file);
    } else {
      alert("File size exceeds 10MB.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setError(null);
    try {
      console.log('Payload:', fileUrls);
      const userId = localStorage.getItem("userId")

      await api.post("/profile", { ...fileUrls ,userId});
      setImg(undefined);
      setVideo(undefined);
      setFileUrls({});
    } catch (err) {
      setError("An error occurred while submitting. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="upload">
      {loading && <p>Uploading...</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="video">Video:</label>
          <br />
          <input
            type="file"
            accept="video/*"
            id="video"
            onChange={(e) => handleFileChange(e.target.files?.[0], setVideo)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="img">Image:</label>
          <br />
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={(e) => handleFileChange(e.target.files?.[0], setImg)}
          />
        </div>
        <br />
        <button type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
