import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";

export default function LoginPage() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // passing user data to context
  const { setUser } = useContext(UserContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    let payload = {
      email,
      password,
    };
    try {
      setLoading(true);
      let res = await axios.post("/login", payload);
      setUser(res?.data?.data);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-8">
        <h1 className="text-4xl text-center mb-4 font-medium">Login</h1>
        <form onSubmit={handleLogin} className="max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <button type="submit" className="primary">
            Login
          </button>
        </form>

        <div className="text-center py-2 text-gray-500">
          Don't have an account?
          <Link to="/register" className="underline text-primary ml-1">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}
