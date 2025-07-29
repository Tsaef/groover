import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaRecordVinyl } from 'react-icons/fa';

interface SearchInputProps {
  query: string;
  onQueryChange: (query: string) => void;
  onFocus: () => void;
  isSearching: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  query,
  onQueryChange,
  onFocus,
  isSearching
}) => {
  return (
    <div className="relative glass rounded-full p-2">
      <div className="flex items-center">
        <FaSearch className="text-purple-300 ml-4 mr-3" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search for records to add to your library..."
          className="flex-1 bg-transparent text-white placeholder-purple-300 focus:outline-none py-3 pr-4"
          onFocus={onFocus}
        />
        {isSearching && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mr-4"
          >
            <FaRecordVinyl className="text-purple-400" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
