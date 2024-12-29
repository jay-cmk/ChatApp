import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import useGetAllUser from '../../context/useGetAllUser';
import UseConversation from '../../zustand/UseConversation';
import { toast } from 'react-toastify';


const Search = () => {
  const [search, setSearch] = useState(""); // Initialized to an empty string
  const [allusers] = useGetAllUser();
  const { setSelectedConversation } = UseConversation();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form default submission
    if (!search.trim()) return; // Prevent searching with empty input
    
    // Find user in allusers
    const conversation = allusers?.find((user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch(""); // Clear search input after a match is found
    } else {
     toast.error("user not found")
    }
  };

  return (
    <div className="h-[10vh]">
      <div className="px-6 py-4">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-3">
            <label className="input input-bordered flex items-center gap-2 w-4/5">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <button type="submit">
              <CiSearch className="text-5xl hover:bg-slate-800 rounded-full p-1 duration-300" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
