import React, { useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa'; 
import { MdOutlineDelete } from "react-icons/md";

function ProfilePhotoSelector({profile,setprofile}) {
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
    if (!file) {
      alert("No file selected");
      return;
    }
    alert("Image uploaded!");
    
  };

 
  const handleRemove = () => {
    setprofile(null);
    setPreview(null);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
     
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
        name='profile'
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
{preview && (
      <div 
      className="flex gap-1 absolute top-73 left-49 sm:top-63 sm:left-95">
        <button
          onClick={handleRemove}
          disabled={!profile}
          className="px-2 py-2 rounded-full bg-white text-black font-bold text-xl border-1 disabled:opacity-50 hover:bg-red-700 hover:text-white duration-400 hover:scale-120 "
        >
       <MdOutlineDelete/>
        </button>
      </div>)}
    </div>
  );
}

export default ProfilePhotoSelector;
