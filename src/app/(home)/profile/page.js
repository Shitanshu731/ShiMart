"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { logout, loggedInUser } = useAuth();
  const endpoint =
    process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || "http://localhost:5000";
  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("userToken") : null;

  const [userData, setUserData] = useState({
    phoneNumber: "",
    userName: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  // Populate userData when loggedInUser is available
  useEffect(() => {
    if (loggedInUser) {
      setUserData({
        phoneNumber: loggedInUser.phoneNumber || "",
        userName: loggedInUser.userName || "",
        email: loggedInUser.email || "",
        password: "", // Keep password empty for security
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

  // Function to update user profile
  const updateUser = async () => {
    console.log(loggedInUser);
    if (!loggedInUser) return alert("User not found. Please log in again.");

    const updatedData = { ...userData };
    if (!updatedData.password) delete updatedData.password; // Remove empty password

    try {
      const response = await fetch(
        `${endpoint}/api/v1/users/update/${loggedInUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Update failed");

      // Update local storage and state
      const updatedUser = { ...loggedInUser, ...data };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const deleteUser = async () => {
    if (!loggedInUser) return alert("User not found. Please log in again.");

    const confirmation = confirm(
      "Are you absolutely sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmation) return;

    try {
      const response = await fetch(
        `${endpoint}/api/v1/users/delete/${loggedInUser._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Delete failed");

      // Clear local storage and log out
      logout();
      router.push("/"); // Redirect to home page
      alert("Account deleted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
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
        placeholder="New Password (optional)"
        value={userData.password}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      />
      <Button onClick={updateUser} className="w-full mb-2">
        Update Profile
      </Button>
      <Button onClick={deleteUser} variant="destructive" className="w-full">
        Delete Account
      </Button>
    </div>
  );
}
