import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! You can now log in.");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signup-form p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium">
            Username:
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Signup
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          Already with us?{" "}
          <Link
            to="/form"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
