import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {LibraryProps, Record, RecordType} from '../types';
import RecordCard from '../components/records/RecordCard';
import RecordModal from '../components/records/RecordModal';
import Button from '../components/ui/Button';

const Library: React.FC<LibraryProps> = ({ records, onAddToPlaylist, playlists }) => {
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [filter, setFilter] = useState<RecordType>('all');

  const filteredRecords: Record[] = records.filter(record =>
    filter === 'all' || record.type === filter
  );

  const handleRecordClick = (record: Record): void => {
    setSelectedRecord(record);
  };

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center space-x-4"
      >
        {['all', 'vinyl', 'cd'].map((type) => (
          <Button
            key={type}
            variant={filter === type ? 'primary' : 'secondary'}
            onClick={() => setFilter(type as 'all' | 'vinyl' | 'cd')}
            className={filter === type ? 'ring-2 ring-purple-400' : ''}
          >
            {type === 'all' ? 'All Records' : type.toUpperCase()}
          </Button>
        ))}
      </motion.div>

      {/* Records Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <AnimatePresence>
          {filteredRecords.map((record, index) => (
            <RecordCard
              key={record.id}
              record={record}
              index={index}
              onClick={handleRecordClick}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Record Modal */}
      <RecordModal
        record={selectedRecord}
        playlists={playlists}
        onClose={() => setSelectedRecord(null)}
        onAddToPlaylist={(playlistId, record) => {
          if (selectedRecord) {
            onAddToPlaylist(playlistId, selectedRecord);
          }
        }}
      />
    </div>
  );
};

export default Library;
