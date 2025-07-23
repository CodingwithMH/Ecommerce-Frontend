import React from "react";
import axios from "axios";
import {
  Shield,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Flip, toast, ToastContainer } from "react-toastify";
const SettingsSection = () => {
const BASE_URI = process.env.BACKEND_URI;
    const {userDetails}=useSelector((state)=>state.user)
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleChangePassword = async () => {
    const data = {
  ...userDetails,
  id:userDetails._id,
  currentPassword,
  newPassword,
};
    try {
      if (!currentPassword || !newPassword) {
        toast.error("Please fill out all fields.");
        return;
      }

      const res = await axios.put(
        `${BASE_URI}/api/auth/update`,data,
        { withCredentials: true }
      );
      toast.success(res.data?.message || "Password updated successfully!");
      setShowPasswordForm(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Failed to update password. Try again."
      );
      console.error("Password change error:", err);
    }
  };
  return (
    <>
    <ToastContainer
    position="top-center"
    autoClose={3000}
    theme="light"
    transition={Flip}
    />
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#313131]">Account Settings</h2>

      {/* Security Settings */}
      <div className="bg-white shadow-lg border border-gray-200 rounded-2xl">
        <div className="p-6">
          <h3 className="text-lg font-bold text-[#313131] mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-[#313131]">Password</p>
              </div>
              <button
               onClick={() => setShowPasswordForm(!showPasswordForm)}
                variant="outline"
                size="sm"
                className="border-[#313131] text-[#313131] p-2 rounded-lg hover:bg-[#313131] hover:text-white bg-transparent"
              >
                {showPasswordForm ? "Cancel" : "Change Password"}
              </button>
            </div>
            {showPasswordForm && (
              <div className="space-y-3">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border rounded-lg p-2 outline-none"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border rounded-lg p-2 outline-none"
                />
                <button
                  onClick={handleChangePassword}
                  className="bg-[#313131] text-white p-2 rounded-lg hover:bg-[#1f1f1f]"
                >
                  Update Password
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white shadow-lg border border-red-200 rounded-2xl">
        <div className="p-6">
          <h3 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-[#313131]">Delete Account</p>
                <p className="text-sm text-[#535353]">
                  Permanently delete your account and all data
                </p>
              </div>
              <button
                onClick={async () => {
                  try {
                    const res = await axios.delete(
                      `${BASE_URI}/api/auth/delete`,
                      { withCredentials: true }
                    );
                    toast.success(res.data?.message || "Deleted Successfully!");
                    navigate("/login");
                  } catch (err) {
                    console.error("Deletion error:", err);
                  }
                }}
                variant="outline"
                size="sm"
                className="border-red-500 p-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SettingsSection;
