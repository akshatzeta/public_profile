import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = isAdmin
      ? "http://localhost:5000/api/auth/admin-login" // Admin login route
      : "http://localhost:5000/api/auth/login"; // Regular login route

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Send email and password only
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");

        // Save token to local storage
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("isAdmin", isAdmin); 

     
        if (isAdmin) {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-form p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

     
      <div className="flex justify-center mb-6">
        <div className="flex bg-gray-300 p-1 rounded-full shadow-md">
          <label
            htmlFor="user"
            className={`cursor-pointer py-2 px-4 rounded-full mr-1 ${
              !isAdmin ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"
            } hover:bg-gray-700 hover:text-white`}
          >
            <input
              type="radio"
              id="user"
              name="role"
              className="hidden"
              checked={!isAdmin}
              onChange={() => setIsAdmin(false)}
            />
            User
          </label>
          <label
            htmlFor="admin"
            className={`cursor-pointer py-2 px-4 rounded-full ${
              isAdmin ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"
            } hover:bg-gray-700 hover:text-white`}
          >
            <input
              type="radio"
              id="admin"
              name="role"
              className="hidden"
              checked={isAdmin}
              onChange={() => setIsAdmin(true)}
            />
            Admin
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
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
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
