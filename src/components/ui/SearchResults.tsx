import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaPlus, FaCheck } from 'react-icons/fa';
import { Record } from '../../types';
import RecordDisc from '../records/RecordDisc';
import Button from './Button';

interface SearchResultsProps {
  results: Record[];
  showResults: boolean;
  query: string;
  isSearching: boolean;
  onAddToLibrary: (record: Record) => void;
  isInLibrary: (recordId: number) => boolean;
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  showResults,
  query,
  isSearching,
  onAddToLibrary,
  isInLibrary,
  onClose
}) => {
  return (
    <>
      {/* Search Results */}
      <AnimatePresence>
        {showResults && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 glass rounded-xl shadow-2xl border border-white/20 max-h-96 overflow-y-auto z-50"
          >
            <div className="p-4">
              <h3 className="text-white font-bold mb-3 flex items-center">
                <FaSearch className="mr-2 text-purple-400" />
                Search Results ({results.length})
              </h3>
              <div className="space-y-2">
                {results.map((record, index) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                  >
                    <div className="relative">
                      <RecordDisc
                        type={record.type}
                        coverColor={record.coverColor}
                        size="md"
                        hover={true}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">{record.title}</h4>
                      <p className="text-purple-200 text-sm truncate">{record.artist}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-purple-300 text-xs">{record.year}</span>
                        <span className="text-purple-400 text-xs">•</span>
                        <span className="text-purple-300 text-xs">{record.genre}</span>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                          record.type === 'vinyl' 
                            ? 'bg-purple-500/30 text-purple-200' 
                            : 'bg-blue-500/30 text-blue-200'
                        }`}>
                          {record.type.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {isInLibrary(record.id) ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-green-500/20 text-green-400 p-2 rounded-full border border-green-400/30"
                        >
                          <FaCheck className="text-sm" />
                        </motion.div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onAddToLibrary(record)}
                          className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <FaPlus className="text-sm" />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results */}
      <AnimatePresence>
        {showResults && results.length === 0 && query.trim() !== '' && !isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 glass rounded-xl shadow-2xl border border-white/20 z-50"
          >
            <div className="p-6 text-center">
              <FaSearch className="text-3xl text-purple-400 mx-auto mb-3 opacity-50" />
              <p className="text-purple-300">No records found for "{query}"</p>
              <p className="text-purple-400 text-sm mt-1">Try a different search term</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {showResults && (
        <div
          className="fixed inset-0 z-40"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default SearchResults;
