"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../_providers/AuthProvider";
import { toast } from "sonner";
import axios from "axios";
import { EditProfile } from "./_components/EditProfileDetails";

const Profile = () => {
  const { user } = useAuth(); 
  const [profileData, setProfileData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/user/${user._id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setProfileData(response.data);
        } catch (err) {
          console.error(err);
          toast.error("Error fetching profile");
        }
      };

      fetchProfile();
    }
  }, [user]);

  return (
    <div className="w-full h-screen mx-auto p-6">
      {profileData ? (
        <div className="flex bg-gradient-to-r from-silver-300 via-silver-400 to-silver-500 w-[1000px] rounded-lg p-8 mx-auto">
          <div className="w-1/3 flex justify-center items-center">
            <img
              src={profileData.profileImage || "/Images/cuteuser.jpg"} 
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
            />
          </div>
          
          <div className="w-2/3 pl-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800">{profileData.name || "Нэр"}</h2>
            <div className="flex  mt-[20px]">
              <div className="text-lg text-gray-700 w-[150px]">Имэйл:</div>
            <p className="text-lg text-gray-700 ">{profileData.email}</p>
          </div>
          <div className="flex  mt-[20px]">
              <div className="text-lg text-gray-700 w-[150px]">Дугаар:</div>
              <p className="text-lg text-gray-700 ">{profileData.phoneNumber || "Утасны дугаар байхгүй байна"}</p>
          </div>
          <div className="flex  mt-[20px]">
              <div className="text-lg text-gray-700 w-[150px]">Хаяг:</div>
              <p className="text-lg text-gray-700 ">{profileData.address || "Хаяг байхгүй байна"}</p>
          </div>
            

            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 px-6 py-3 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition-all duration-300"
            >
              Хувийн мэдээлэл өөрчлөх
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-xl">Хувийн мэдээлэл алга байна</p>
      )}

      {isEditing && (
        <EditProfile
          profileData={profileData}
          setIsEditing={setIsEditing}
          setProfileData={setProfileData}
        />
      )}
    </div>
  );
};

export default Profile;
