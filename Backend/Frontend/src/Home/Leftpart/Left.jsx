import React from 'react';
import Search from './Search';
import User from './User';
import Logout from './Logout';

const Left = () => {
  return (
    <div className="w-[25%]  text-gray-300 flex flex-col ">
      {/* Search and User section */}
      <div className="flex-grow overflow-y-auto">
        <Search />
        <User />
      </div>

      {/* Logout button */}
      <div className=" ">
        <Logout />
      </div>
    </div>
  );
};

export default Left;
