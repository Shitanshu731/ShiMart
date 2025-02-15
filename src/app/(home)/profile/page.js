"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { login, logout, loggedInUser } = useAuth();
  const [userData, setUserData] = useState({
    phoneNumber: "",
    userName: "",
    email: "",
    password: "",
  });

  // Populate userData when loggedInUser is available
  useEffect(() => {
    if (loggedInUser) {
      setUserData({
        phoneNumber: loggedInUser.phoneNumber || "",
        userName: loggedInUser.userName || "",
        email: loggedInUser.email || "",
        password: "", // Password remains empty for security reasons
      });
    }
  }, [loggedInUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: name === "phoneNumber" ? value.replace(/\D/g, "") : value,
    });
  };

  const handleUpdate = () => {
    alert("Profile updated successfully!");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      alert("Account deleted successfully!");
    }
  };

  if (!loggedInUser) return <p>Please login to view your profile</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <input
        type="text"
        name="userName"
        placeholder="Username"
        value={userData.userName}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={userData.phoneNumber}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={userData.password}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      />
      <Button onClick={handleUpdate} className="w-full mb-2">
        Update Profile
      </Button>
      <Button onClick={handleDelete} variant="destructive" className="w-full">
        Delete Account
      </Button>
    </div>
  );
}
