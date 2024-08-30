import React, { useState } from "react";

export default function AdminDashboard({ addSlide }) {
  const [imageFile, setImageFile] = useState(null);
  const [linkUrl, setLinkUrl] = useState("");

  const handleAddSlide = async () => {
    if (imageFile || linkUrl) {
      const formData = new FormData();
      if (imageFile) {
        formData.append("image", imageFile);
      }
      formData.append("linkUrl", linkUrl);

      await addSlide(formData);
      setImageFile(null);
      setLinkUrl("");
    }
  };

  return (
    <>
      <div className="admin-dashboard">
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          accept="image/*"
        />
        <input
          type="text"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          placeholder="Enter external link URL (optional)"
        />
        <button onClick={handleAddSlide}>Add Slide</button>
      </div>
    </>
  );
}
