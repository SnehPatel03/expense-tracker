import React, { useRef, useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdOutlineDelete } from "react-icons/md";

function ProfilePhotoSelector({ profile, setprofile }) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleCircleClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setprofile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert("Please select a valid image");
    }
  };

  const handleUpload = () => {
    if (!profile) {
      alert("No file selected");
      return;
    }
    alert("Image uploaded!");
    // Add actual upload logic here if needed
  };

  const handleRemove = () => {
    setprofile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (typeof profile === 'string') {
      setPreview(`https://expense-tracker-backend-jkhf.onrender.com/${profile}`);
    }
  }, [profile]);

  return (
    <div className="flex flex-col items-center gap-4 p-4 relative">
      <div
        onClick={handleCircleClick}
        className="relative w-32 h-32 rounded-full border-2 border-gray-400 cursor-pointer overflow-hidden flex items-center justify-center bg-gray-100 hover:ring-1 hover:ring-purple-500 transition"
      >
        {preview ? (
          <img src={preview} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <FaUser className="text-gray-400 text-4xl" />
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        name="profile"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {preview && (
        <div className="flex gap-1 absolute top-[115px] left-[100px]">
          <button
            onClick={handleRemove}
            className="px-2 py-2 rounded-full bg-white text-black text-xl hover:bg-red-700 hover:text-white transition-all"
          >
            <MdOutlineDelete />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePhotoSelector;
