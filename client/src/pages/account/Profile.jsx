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
    <div className="mx-auto">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, temporibus soluta? Veritatis?</p>
      <button className="primary mt-2 max-w-sm" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
