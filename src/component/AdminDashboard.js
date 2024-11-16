import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [pendingProfiles, setPendingProfiles] = useState([]);

  useEffect(() => {
    
    const fetchProfiles = async () => {
      try {
        const [profilesRes, pendingRes] = await Promise.all([
          axios.get("http://localhost:5000/api/profiles"),
          axios.get("http://localhost:5000/api/profiles/pending"),
        ]);

        setProfiles(profilesRes.data);
        setPendingProfiles(pendingRes.data);
      } catch (error) {
        console.error("Error fetching profiles or pending profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  const approveProfile = async (id) => {
    try {
      const profileToApprove = pendingProfiles.find((profile) => profile.id === id);
      if (profileToApprove) {
       
        const updatedProfiles = [...profiles, profileToApprove];
        setProfiles(updatedProfiles);

        /
        await axios.post(`http://localhost:5000/api/profiles/approve/${profileToApprove.id}`);

        
        const updatedPendingProfiles = pendingProfiles.filter((profile) => profile.id !== id);
        setPendingProfiles(updatedPendingProfiles);
      } else {
        console.error("Profile not found in pending profiles:", id);
      }
    } catch (error) {
      console.error("Error approving profile:", error);
    }
  };

  const rejectProfile = async (id) => {
    try {
    
      const updatedPendingProfiles = pendingProfiles.filter((profile) => profile.id !== id);
      
      setPendingProfiles(updatedPendingProfiles);

      await axios.post("http://localhost:5000/api/profiles/pending", updatedPendingProfiles);
    } catch (error) {
      console.error("Error rejecting profile:", error);
    }
  };
  

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Admin Dashboard
      </h1>

      {/* Approved Profiles */}
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Approved Profiles</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10">
        {profiles.map((profile) => (
          <div
            key={profile.id} 
            className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow"
          >
            <img
              src={profile.profilePic || "default_image.jpg"}
              alt={profile.name || "Profile"}
              className="w-24 h-24 rounded-full mb-3 object-cover border shadow-sm mx-auto"
            />
            <h3 className="text-lg font-medium text-center">{profile.name}</h3>
            <p className="text-gray-600 text-center">{profile.description}</p>
          </div>
        ))}
      </div>

      {/* Pending Profiles */}
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Pending Profiles</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {pendingProfiles.map((profile) => (
          <div
            key={profile.id} 
            className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow"
          >
            <img
              src={profile.profilePic || "default_image.jpg"}
              alt={profile.name || "Profile"}
              className="w-24 h-24 rounded-full mb-3 object-cover border shadow-sm mx-auto"
            />
            <h3 className="text-lg font-medium text-center">{profile.name}</h3>
            <p className="text-gray-600 text-center">{profile.description}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => approveProfile(profile.id)} 
                className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() => rejectProfile(profile.id)}
                className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
