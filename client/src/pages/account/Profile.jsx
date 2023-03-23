import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Profile() {
  const { isReady, user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
      navigate("/");
    } catch (e) {
      console.log(e?.response?.body);
    }
  };
  return (
    <div className="">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, temporibus soluta? Veritatis?</p>
      <div className="text-left mt-4">
        <button className="primary w-1/4" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
