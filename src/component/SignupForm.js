import React, { useState } from "react";
import axios from "axios";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    profilePic: "",
    name: "",
    description: "",
    gmapIframe: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/profiles/pending", formData);
      alert("Profile submitted for approval.");
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Signup Form</h1>
      <input
        type="text"
        value={formData.profilePic}
        onChange={(e) => setFormData({ ...formData, profilePic: e.target.value })}
        placeholder="Profile Picture URL"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Description"
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        value={formData.gmapIframe}
        onChange={(e) =>
          setFormData({ ...formData, gmapIframe: e.target.value })
        }
        placeholder="Google Maps Embed Code"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default SignupForm;
