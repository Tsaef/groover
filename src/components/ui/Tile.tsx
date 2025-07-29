import React from 'react';
import { motion } from 'framer-motion';

interface TileProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hover?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'sm' | 'md' | 'lg';
}

const Tile: React.FC<TileProps> = ({
  children,
  onClick,
  className = '',
  hover = true,
  rounded = 'xl',
  padding = 'md'
}) => {
  const baseClasses = 'glass transition-all duration-300';
  const hoverClasses = hover ? 'glass-hover cursor-pointer' : '';
  const roundedClasses = {
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl'
  };
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`${baseClasses} ${hoverClasses} ${roundedClasses[rounded]} ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Tile;
