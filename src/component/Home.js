import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LiaMapMarkedAltSolid } from "react-icons/lia";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [showMap, setShowMap] = useState(null); 

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profiles');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  const handleShowMap = (profileId) => {
    setShowMap(profileId); 
  };

  const handleCloseMap = () => {
    setShowMap(null); 
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Desktop view */}
      <div className="hidden lg:flex lg:flex-col space-y-6">
        {profiles.slice(0, 8).map((profile) => (
          <div
            key={profile.id}
            className="flex items-center border p-4 rounded-lg hover:shadow-lg transition-shadow duration-200 bg-gray-100 w-full"
          >
            <img
              src={profile.profilePic || 'default_image.jpg'}
              alt={profile.name || 'Profile Picture'}
              className="w-20 h-20 object-cover rounded-full mr-4 flex-shrink-0"
            />
            <div className="flex-grow flex flex-col justify-between">
              <Link to={`/profile/${profile.id}`}>
                <h3 className="text-lg font-semibold">{profile.name || 'Profile Name'}</h3>
              </Link>
              <p className="text-sm text-gray-600 line-clamp-2 px-5">
                {profile.description || 'No description available.'}
              </p>
            </div>
            <button
              onClick={() => handleShowMap(profile.id)}
              className="ml-4 px-6 py-4 bg-black text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <LiaMapMarkedAltSolid className='4xl'/>
            </button>
          </div>
        ))}
      </div>

      {/* Mobile view */}
      <div className="lg:hidden flex flex-col space-y-4">
        {profiles.slice(0, 8).map((profile) => (
          <div
            key={profile.id}
            className="flex items-center border p-4 rounded-lg bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-200 w-full"
          >
            <img
              src={profile.profilePic || 'default_image.jpg'}
              alt={profile.name || 'Profile Picture'}
              className="w-20 h-20 object-cover rounded-full mr-4 flex-shrink-0"
            />
            <div className="flex-grow flex flex-col justify-between">
              <Link to={`/profile/${profile.id}`}>
                <h3 className="text-lg font-semibold text-center">{profile.name || 'Profile Name'}</h3>
              </Link>
              <p className="text-sm text-gray-600 line-clamp-2">
                {profile.description || 'No description available.'}
              </p>
            </div>
            <button
              onClick={() => handleShowMap(profile.id)}
              className="ml-4 px-6 py-4 bg-black text-white rounded-lg hover:bg-gray-600 transition-colors flex-shrink-0"
            >
              <LiaMapMarkedAltSolid className='4xl'/>
            </button>
          </div>
        ))}
      </div>

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            <button
              onClick={handleCloseMap}
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            <div
              dangerouslySetInnerHTML={{
                __html: profiles.find((profile) => profile.id === showMap)?.gmapIframe || '<p>No Map Available</p>',
              }}
              className="flex w-auto h-auto sm:h-auto lg:h-auto rounded-lg shadow-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
