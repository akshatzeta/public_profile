import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Page = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/profiles`);
        const foundProfile = response.data.find((item) => item.id === parseInt(id));
        if (foundProfile) {
          setProfile(foundProfile);
        } else {
          setError("Profile not found.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-row-2 gap-6 justify-center bg-gray-50 min-h-screen">
      
      <div className="px-2 ">
        <div className="flex justify-center lg:justify-center bg-gray-100 border rounded-lg shadow-lg pt-2 pb-2">
          <img
            src={profile.profilePic || "default_image.jpg"}
            alt={profile.name || "Profile Picture"}
            className="w-40 h-40 rounded-full shadow-lg"
          />
        </div>
        <div className="bg-black-100 border rounded-lg pt-4 shadow-md pb-4">
        <h2 className="text-2xl font-bold mt-2 text-center lg:text-center ">
          {profile.name || "No Name"}
        </h2>
        <p className="text-lg text-gray-800 mt-1 text-center lg:text-center">
          {profile.description || "No description available."}
        </p>
        </div>
      </div>

      
      <div className="">
        <div
          dangerouslySetInnerHTML={{ __html: profile.gmapIframe || "<p>No Map Available</p>" }}
          className="flex w-grow h-64 sm:h-80 lg:h-[500px] rounded-lg shadow-sm justify-center px-5 "
        />
      </div>
    </div>
  );
};

export default Page;
