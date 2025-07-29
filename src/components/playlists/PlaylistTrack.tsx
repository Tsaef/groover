import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { Record } from '../../types';
import RecordDisc from '../records/RecordDisc';

interface PlaylistTrackProps {
  record: Record;
  index: number;
  onRemove: () => void;
}

const PlaylistTrack: React.FC<PlaylistTrackProps> = ({ record, index, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
    >
      <div className="relative">
        <RecordDisc
          type={record.type}
          coverColor={record.coverColor}
          size="md"
          hover={false}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-white font-medium truncate">{record.title}</h4>
        <p className="text-purple-200 text-sm truncate">{record.artist}</p>
      </div>

      <button
        onClick={onRemove}
        className="text-red-400 hover:text-red-300 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <FaTrash className="text-sm" />
      </button>
    </motion.div>
  );
};

export default PlaylistTrack;
