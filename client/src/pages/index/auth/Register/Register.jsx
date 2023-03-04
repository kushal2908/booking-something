import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [loading, setLoading] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    let payload = {
      name,
      email,
      password,
    };
    try {
      setLoading(true);
      let res = await axios.post("/register", payload);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-8">
        <h1 className="text-4xl text-center mb-4 font-medium">Register</h1>
        <form onSubmit={handleRegister} className="max-w-md mx-auto">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <input
            type="email"
            placeholder="Your email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <input
            type="password"
            placeholder="Your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <button type="submit" className="primary" disabled={loading}>
            Register
          </button>
        </form>

        <div className="text-center py-2 text-gray-500">
          Already have an account?
          <Link to="/login" className="underline text-primary ml-1">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
