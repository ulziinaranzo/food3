"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../_providers/AuthProvider";
import { toast } from "sonner";
import axios from "axios";
import { EditProfile } from "./EditProfileDetails";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return <div>Хэрэглэгчийн мэдээлэл олдсонгүй</div>;
  }

  return (
    <div className="w-full h-screen mx-auto p-6">
      <div className="flex bg-gradient-to-r from-silver-300 via-silver-400 to-silver-500 w-[1000px] rounded-lg p-8 mx-auto">
        <div className="w-1/3 flex justify-center items-center">
          <img
            src={user.image || "/Images/cuteuser.jpg"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
          />
        </div>

        <div className="w-2/3 pl-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Хэрэглэгчийн мэдээлэл
          </h2>
          <div className="flex  mt-[20px]">
            <div className="text-lg text-gray-700 w-[150px]">Имэйл:</div>
            <p className="text-lg text-gray-700 ">{user.email}</p>
          </div>
          <div className="flex  mt-[20px]">
            <div className="text-lg text-gray-700 w-[150px]">Дугаар:</div>
            <p className="text-lg text-gray-700 ">
              {user.phoneNumber || "Утасны дугаар байхгүй байна"}
            </p>
          </div>
          <div className="flex  mt-[20px]">
            <div className="text-lg text-gray-700 w-[150px]">Хаяг:</div>
            <p className="text-lg text-gray-700 ">
              {user.address || "Хаяг байхгүй байна"}
            </p>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 px-6 py-3 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition-all duration-300"
          >
            Хувийн мэдээлэл өөрчлөх
          </button>
        </div>
      </div>

      {isEditing && <EditProfile setIsEditing={setIsEditing} />}
    </div>
  );
};

export default Profile;
