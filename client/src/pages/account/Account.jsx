import axios from "axios";
import React, { useContext } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Places from "./Places/Places";
import Profile from "./Profile";

export default function Account() {
  const { isReady, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (isReady && !user) {
    return <Navigate to="/login" />;
  }

  function linkClasses(type = null) {
    let classes = "text-medium py-2 px-4 flex items-center rounded-full";
    if (type === subpage) {
      classes = classes + " bg-primary text-white rounded-full";
    } else {
      classes = classes + " bg-gray-200";
    }
    return classes;
  }

  return (
    <div className="px-8">
      <div className="border-b border-gray-200">
        <h2 className="text-4xl font-medium mb-2 mt-28">Account</h2>
        <h3 className="mb-2">
          <span className="font-medium">{user?.name}</span>, Welcome
        </h3>
      </div>
      <div className="m-auto max-w-4xl">
        <nav className="mt-8 w-full flex gap-2 font-medium text-sm md:text-lg">
          <Link className={linkClasses("profile")} to={"/account/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            My Profile
          </Link>
          <Link className={linkClasses("bookings")} to={"/account/bookings"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            My Bookings
          </Link>
          <Link className={linkClasses("places")} to={"/account/places"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            My Places
          </Link>
        </nav>
        <div className="px-2 my-12">
          {subpage === "profile" && <Profile />}
          {subpage === "places" && <Places />}
        </div>
      </div>
    </div>
  );
}
