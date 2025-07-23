import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/user/userSlice';
import axios from "axios";
import { toast, ToastContainer,Flip } from "react-toastify";
import {
  User,
  Mail,
  Phone,
  Edit3,
  MapPin,
} from "lucide-react"
  const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false)
    const { userDetails } = useSelector((state) => state.user);
      const dispatch=useDispatch()
      useEffect(()=>{
        dispatch(fetchUser())
      },[dispatch])
      const [userProfile, setUserProfile] = useState({
        id:"",
        name: "",
        email: "",
        phone: "",
        address:""
      })
      useEffect(()=>{

        if(userDetails){

            setUserProfile({
                id:userDetails?._id || "",
        name: userDetails?.name || "",
        email: userDetails?.email || "",
        phone: userDetails?.phone || "",
        address:userDetails?.address || ""
    })
}
      },[userDetails])
        const handleProfileUpdate = (field, value) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }
    return (<>
    <ToastContainer
position="top-center"
autoClose={3000}
theme="light"
transition={Flip}
/>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#313131]">Personal Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          variant="outline"
          className="border-[#313131] flex text-[#313131] rounded-lg hover:bg-[#313131] hover:text-white bg-transparent pr-2 py-1"
        >
          <Edit3 className="w-4 h-4 mx-2" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="bg-white shadow-lg border border-gray-200 rounded-2xl">
        <div className="p-8">
          <div className="flex items-center gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold text-[#313131]">
                {userDetails?.name || ""}
              </h3>
              <p className="text-[#535353]">{userDetails?.email || ""}</p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="text-[#313131] font-medium mb-2 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#313131]" />
                <input
                  id="name"
                  type="text"
                  value={userProfile?.name || ""}
                  onChange={(e) => handleProfileUpdate("name", e.target.value)}
                  disabled={!isEditing}
                  className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] border-none w-full pl-12 pr-2 py-3 rounded-lg text-[#313131] disabled:opacity-70"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-[#313131] font-medium mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#313131]" />
                <input
                  id="email"
                  type="email"
                  value={userProfile?.email || ""}
                  onChange={(e) => handleProfileUpdate("email", e.target.value)}
                  disabled={!isEditing}
                  className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] border-none w-full pl-12 pr-2 py-3 rounded-lg text-[#313131] disabled:opacity-70"
                />
              </div>
            </div>
            <div>
              <label htmlFor="address" className="text-[#313131] font-medium mb-2 block">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#313131]" />
                <input
                  id="address"
                  type="text"
                  value={userProfile?.address || ""}
                  onChange={(e) => handleProfileUpdate("address", e.target.value)}
                  disabled={!isEditing}
                  className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] border-none w-full pl-12 pr-2 py-3 rounded-lg text-[#313131] disabled:opacity-70"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="text-[#313131] font-medium mb-2 block">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#313131]" />
                <input
                  id="phone"
                  type="tel"
                  value={userProfile?.phone || ""}
                  onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                  disabled={!isEditing}
                  className="bg-[#E8F0FE] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] border-none w-full pl-12 pr-2 py-3 rounded-lg text-[#313131] disabled:opacity-70"
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={async () => {
                      try {
                        const res=await axios.put(
                          "http://localhost:5000/api/auth/update",
                          userProfile,
                          { withCredentials: true }
                        );
                        toast.success(res.data?.message || 'Updated Successfully!')
                      } catch (err) {
                        console.error("Updation error:", err);
                      }
                      setIsEditing(false)
                    }}
                    
                className="bg-[#e8e810] hover:bg-[#eaea28] text-[#313131] font-bold px-8 py-3 rounded-lg"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="border-[#313131] text-[#313131] hover:bg-[#313131] hover:text-white bg-transparent px-8 py-3 rounded-lg"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )}

export default ProfileSection
