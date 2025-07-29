import React from 'react';
import { motion } from 'framer-motion';
import { FaRecordVinyl, FaCompactDisc } from 'react-icons/fa';
import {RecordType} from "../../types";

interface RecordDiscProps {
  type: RecordType;
  coverColor: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  spinning?: boolean;
  hover?: boolean;
}

const RecordDisc: React.FC<RecordDiscProps> = ({
  type,
  coverColor,
  size = 'md',
  spinning = false,
  hover = true
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const iconSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full ${type === 'vinyl' ? 'vinyl-record' : 'cd-disc'} flex items-center justify-center shadow-lg`}
      style={{ backgroundColor: coverColor }}
      whileHover={hover ? { rotateY: 180 } : {}}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        animate={spinning ? { rotate: 360 } : {}}
        transition={spinning ? { duration: 3, repeat: Infinity, ease: "linear" } : {}}
      >
        {type === 'vinyl' ? (
          <FaRecordVinyl className={`text-white ${iconSizes[size]}`} />
        ) : (
          <FaCompactDisc className={`text-gray-600 ${iconSizes[size]}`} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default RecordDisc;
