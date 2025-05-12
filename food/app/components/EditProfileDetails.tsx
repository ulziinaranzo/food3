"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { useAuth, User } from "@/app/_providers/AuthProvider";

type EditProfileProps = {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  updateLocalUser: (value: User) => void;
};

const UPLOAD_PRESET = "ml_default";
const CLOUD_NAME = "dxhmgs7wt";

export const EditProfile = ({ setIsEditing }: EditProfileProps) => {
  const { user, token, setUser } = useAuth();
  console.log("user in EditProfile:", user);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [address, setAddress] = useState(user?.address || "");
  const [profileImage, setProfileImage] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      toast.error("Error uploading image");
      return null;
    }
  };
  const handleSave = async () => {
    if (!user) {
      toast.error("Хэрэглэгчийн мэдээлэл олдсонгүй");
      return;
    }
    setLoading(true);
    try {
      const updatedProfile = {
        phoneNumber,
        address,
        image: profileImage,
      };
      const response = await axios.put(
        `http://localhost:3001/user/${user._id}`,
        updatedProfile,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        setUser(response.data.user);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadImage(file);
      if (url) setProfileImage(url);
    }
  };
  return (
    <div className="absolute top-[50px] right-[200px] flex flex-col bg-white shadow-xl rounded-lg p-8 w-[500px] mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Хувийн мэдээлэл өөрчлөх
      </h2>
      <div className="flex text-left flex-col mb-5 w-full">
        <label className="text-gray-600">Утасны дугаар</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border rounded-xl p-3 mt-2 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div className="flex text-left flex-col mb-5 w-full">
        <label className="text-gray-600">Хаяг</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border rounded-xl p-3 mt-2 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div className="flex text-left flex-col mb-5 w-full">
        <label className="text-gray-600">Зураг</label>
        {!profileImage ? (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="border rounded-xl p-3 mt-2 shadow-md focus:outline-none"
          />
        ) : (
          <div className="relative mb-4">
            <img
              src={profileImage}
              className="w-full h-48 object-cover rounded-xl shadow-md"
            />
            <button
              type="button"
              onClick={() => setProfileImage("")}
              className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full text-black hover:bg-gray-300"
            >
              x
            </button>
          </div>
        )}
      </div>
      <div className="flex gap-6 justify-end w-full">
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="bg-gray-300 text-black px-6 py-3 rounded-full shadow-md hover:bg-gray-400 transition-all duration-300"
        >
          Буцах
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="bg-red-400 text-white px-6 py-3 rounded-full shadow-md hover:bg-red-900 transition-all duration-300"
        >
          {loading ? <HashLoader /> : "Шинэчлэх"}
        </button>
      </div>
    </div>
  );
};
