import React, { useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import axios from 'axios';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSearchBar = () => setIsSearchOpen((prev) => !prev);

  useEffect(() => {
    // Fetch profiles from the API or a static JSON file
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/profiles"); // Update this URL to your actual API endpoint
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  // Filter profiles based on the search query
  const filteredProfiles = profiles.filter(
    (profile) =>
      (profile.name && profile.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (profile.description && profile.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handle selecting an item
  const handleSelectItem = (item) => {
    if (selectedItems.some((selected) => selected.id === item.id)) {
      setSelectedItems((prev) =>
        prev.filter((selected) => selected.id !== item.id)
      );
    } else {
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  // Remove selected item
  const handleRemoveItem = (id) =>
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center py-4 w-full">
          <div className="flex items-center space-x-4">
            {/* Remove mobile menu button */}
            <button className="text-2xl p-2" onClick={toggleSearchBar}>
              <FiSearch />
            </button>
          </div>

          <div className="flex items-center space-x-6">
            <button className="bg-black text-white px-4 py-2 rounded-full">
              Let’s Talk
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search bar toggle */}
      {isSearchOpen && (
        <div className="fixed top-0 left-0 w-3/4 sm:w-1/2 lg:w-1/3 h-full bg-white z-50 p-4 shadow-lg">
          <button onClick={toggleSearchBar} className="text-xl">
            <FiX />
          </button>

          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <FiSearch className="text-2xl" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                placeholder="Search for profiles..."
              />
            </div>

            <div className="flex flex-wrap mt-4 space-x-2">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-2 bg-gray-200 p-2 rounded"
                >
                  <span>{item.name}</span>
                  <FiX
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 cursor-pointer"
                  />
                </div>
              ))}
            </div>

            {searchQuery && (
              <div className="mt-4 bg-white shadow-lg rounded-lg">
                {filteredProfiles.length > 0 ? (
                  <ul>
                    {filteredProfiles.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleSelectItem(item)}
                        className="cursor-pointer p-2 hover:bg-gray-100 flex justify-between items-center"
                      >
                        <span>
                          {item.name} - {item.description}
                        </span>
                        {selectedItems.some((selected) => selected.id === item.id) && (
                          <FiX className="text-red-500" />
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-gray-500">No results found</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
