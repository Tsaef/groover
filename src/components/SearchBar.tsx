import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {Record, SearchBarProps} from '../types';
import {searchableRecords} from '../data/mockData';
import SearchInput from './ui/SearchInput';
import SearchResults from './ui/SearchResults';

const SearchBar: React.FC<SearchBarProps> = ({ onAddToLibrary, library }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Record[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const filtered: Record[] = searchableRecords.filter(record =>
        record.title.toLowerCase().includes(query.toLowerCase()) ||
        record.artist.toLowerCase().includes(query.toLowerCase()) ||
        record.genre.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setShowResults(true);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const isInLibrary = (recordId: number): boolean => {
    return library.some(record => record.id === recordId);
  };

  const handleAddToLibrary = (record: Record): void => {
    onAddToLibrary(record);
  };

  return (
    <div className="relative mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-w-2xl mx-auto"
      >
        <SearchInput
          query={query}
          onQueryChange={setQuery}
          onFocus={() => query && setShowResults(true)}
          isSearching={isSearching}
        />

        <SearchResults
          results={results}
          showResults={showResults}
          query={query}
          isSearching={isSearching}
          onAddToLibrary={handleAddToLibrary}
          isInLibrary={isInLibrary}
          onClose={() => setShowResults(false)}
        />
      </motion.div>
    </div>
  );
};

export default SearchBar;
