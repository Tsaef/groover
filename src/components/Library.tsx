import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRecordVinyl, FaCompactDisc, FaPlus, FaPlay } from 'react-icons/fa';
import { LibraryProps, Record, RecordType } from '../types';

const Library: React.FC<LibraryProps> = ({ records, onAddToPlaylist, playlists, initialFilter = 'all' }) => {
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [filter, setFilter] = useState<RecordType>(initialFilter);

  // Update filter when initialFilter changes
  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);

  const filteredRecords: Record[] = records.filter(record =>
    filter === 'all' || record.type === filter
  );

  const handleRecordClick = (record: Record): void => {
    setSelectedRecord(record);
  };

  interface RecordCardProps {
    record: Record;
    index: number;
  }

  const RecordCard: React.FC<RecordCardProps> = ({ record, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="relative cursor-pointer group"
      onClick={() => handleRecordClick(record)}
    >
      <div className="glass rounded-xl p-4 h-full">
        <div className="relative mb-4">
          <motion.div
            className={`w-24 h-24 mx-auto rounded-full ${record.type === 'vinyl' ? 'vinyl-record' : 'cd-disc'} flex items-center justify-center shadow-2xl group-hover:shadow-purple-500/30 transition-shadow duration-300`}
            style={{ backgroundColor: record.coverColor }}
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="group-hover:animate-none"
            >
              {record.type === 'vinyl' ? (
                <FaRecordVinyl className="text-white text-lg" />
              ) : (
                <FaCompactDisc className="text-gray-600 text-lg" />
              )}
            </motion.div>
          </motion.div>
          <div className="absolute inset-0 rounded-full animate-pulse opacity-20 bg-purple-400 group-hover:opacity-40 transition-opacity"></div>
        </div>

        <div className="text-center">
          <h3 className="text-white font-bold text-sm mb-1 truncate">{record.title}</h3>
          <p className="text-purple-200 text-xs mb-1 truncate">{record.artist}</p>
          <p className="text-purple-300 text-xs">{record.year}</p>
          <span className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${
            record.type === 'vinyl' 
              ? 'bg-purple-500/30 text-purple-200' 
              : 'bg-blue-500/30 text-blue-200'
          }`}>
            {record.type.toUpperCase()}
          </span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center space-x-4"
      >
        {['all', 'vinyl', 'cd'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as 'all' | 'vinyl' | 'cd')}
            className={`px-6 py-2 rounded-lg glass glass-hover text-white font-medium capitalize transition-all duration-300 ${
              filter === type ? 'bg-purple-500/30 ring-2 ring-purple-400' : ''
            }`}
          >
            {type === 'all' ? 'All Records' : type.toUpperCase()}
          </button>
        ))}
      </motion.div>

      {/* Records Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <AnimatePresence>
          {filteredRecords.map((record, index) => (
            <RecordCard key={record.id} record={record} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Selected Record Modal */}
      <AnimatePresence>
        {selectedRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedRecord(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
              transition={{ type: "spring", damping: 20 }}
              className="glass rounded-xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <motion.div
                  className={`w-32 h-32 mx-auto rounded-full ${selectedRecord.type === 'vinyl' ? 'vinyl-record' : 'cd-disc'} flex items-center justify-center shadow-2xl mb-4`}
                  style={{ backgroundColor: selectedRecord.coverColor }}
                  animate={{ rotateY: [0, 180, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  {selectedRecord.type === 'vinyl' ? (
                    <FaRecordVinyl className="text-white text-2xl" />
                  ) : (
                    <FaCompactDisc className="text-gray-600 text-2xl" />
                  )}
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-2">{selectedRecord.title}</h2>
                <p className="text-purple-200 text-lg mb-1">{selectedRecord.artist}</p>
                <p className="text-purple-300">{selectedRecord.year} • {selectedRecord.genre}</p>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:from-purple-700 hover:to-purple-800 transition-all"
                >
                  <FaPlay className="text-sm" />
                  <span>Play</span>
                </motion.button>

                <div className="space-y-2">
                  <p className="text-purple-200 text-sm font-medium">Add to Playlist:</p>
                  {playlists.map((playlist) => (
                    <motion.button
                      key={playlist.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectedRecord && onAddToPlaylist(playlist.id, selectedRecord)}
                      className="w-full glass glass-hover text-white py-2 rounded-lg font-medium flex items-center justify-center space-x-2"
                    >
                      <FaPlus className="text-sm" />
                      <span>{playlist.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Library;
