import axios from "axios";
import React, { useContext } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import AccountNavigation from "./AccountNavigation";
import Places from "./Places/Places";
import Profile from "./Profile";

export default function ProfilePage() {
  const { isReady, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  if (isReady && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="mt-8 w-full md:w-2/3 mx-auto">
      <AccountNavigation />
      <div className="border-b border-gray-200 mt-8">
        <h3 className="mb-2">
          <span className="font-medium">{user?.name}</span>, Welcome
          <Profile />
        </h3>
      </div>
    </div>
  );
}
