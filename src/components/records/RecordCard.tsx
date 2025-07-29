import React from 'react';
import { motion } from 'framer-motion';
import { Record } from '../../types';
import RecordDisc from './RecordDisc';
import Tile from '../ui/Tile';

interface RecordCardProps {
  record: Record;
  index: number;
  onClick: (record: Record) => void;
}

const RecordCard: React.FC<RecordCardProps> = ({ record, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="relative cursor-pointer group"
      onClick={() => onClick(record)}
    >
      <Tile className="h-full">
        <div className="relative mb-4">
          <RecordDisc
            type={record.type}
            coverColor={record.coverColor}
            size="xl"
            spinning={true}
            hover={true}
          />
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
      </Tile>
    </motion.div>
  );
};

export default RecordCard;
