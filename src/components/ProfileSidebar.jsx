import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
const ProfileSidebar = () => {
  const { loggedInUser, logout } = useAuth();
  const router = useRouter();
  return (
    <div className="flex gap-4 flex-col mt-10">
      <Button variant="default" onClick={() => router.push("/profile")}>
        Profile
      </Button>
      <Button
        variant={loggedInUser ? "destructive" : "secondary"}
        onClick={
          loggedInUser
            ? logout
            : () => {
                router.push("/login");
              }
        }
      >
        {loggedInUser ? "Logout" : "Login"}
      </Button>
    </div>
  );
};

export default ProfileSidebar;
