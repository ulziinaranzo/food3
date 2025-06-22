"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { useAuth, User } from "@/app/_providers/AuthProvider";
import { api, setAuthToken } from "@/axios";

type EditProfileProps = {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  updateLocalUser: (value: User) => void;
};
const UPLOAD_PRESET = "ml_default";
const CLOUD_NAME = "dxhmgs7wt";
export const EditProfile = ({
  setIsEditing,
  updateLocalUser,
}: EditProfileProps) => {
  const { user, setUser } = useAuth();
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
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
    setLoading(true);
    try {
      const updatedProfile = {
        phoneNumber,
        address,
        image: profileImage,
      };
      const response = await api.put(`/user/${user._id}`, updatedProfile);
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        const updatedUser = { ...user, ...updatedProfile };
        setUser(updatedUser);
        updateLocalUser(updatedUser);
        setIsEditing(false);
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
      setLoading(true);
      const url = await uploadImage(file);
      if (url) setProfileImage(url);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex text-left flex-col mb-5 w-full">
        <label className="text-gray-600 mb-2">Утасны дугаар</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border rounded-xl p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div className="flex text-left flex-col mb-5 w-full">
        <label className="text-gray-600 mb-2">Хаяг</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border rounded-xl p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div className="flex text-left flex-col mb-5 w-full">
        <label className="text-gray-600 mb-2">Зураг</label>
        {!profileImage ? (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="border rounded-xl p-3 shadow-md focus:outline-none"
          />
        ) : (
          <div className="relative mb-4">
            <img
              src={profileImage}
              className="w-full h-48 object-cover rounded-xl shadow-md"
              alt="Profile preview"
            />
            <button
              type="button"
              onClick={() => setProfileImage("")}
              className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full text-black hover:bg-gray-300"
            >
              ×
            </button>
          </div>
        )}
      </div>
      <div className="flex gap-4 justify-end w-full">
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
          className="bg-red-400 text-white px-6 py-3 rounded-full shadow-md hover:bg-red-500 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? <HashLoader size={20} color="#ffffff" /> : "Шинэчлэх"}
        </button>
      </div>
    </div>
  );
};
