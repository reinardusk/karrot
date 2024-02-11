"use client";

import { IoMdSearch } from "react-icons/io";

const SearchForm = () => {
  return (
    <form className="flex gap-1 items-center" method="GET">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        className="p-1 px-2 text-xl my-1 border border-gray-500 rounded-md w-[300px]"
      />
      <button
        type="submit"
        className="hover:text-gray-950/70 transition-colors duration-200"
      >
        <IoMdSearch size={20} />
      </button>
    </form>
  );
};

export default SearchForm;
