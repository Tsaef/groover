import React from 'react';
import { motion } from 'framer-motion';
import { FaRecordVinyl, FaCompactDisc, FaMusic, FaListUl } from 'react-icons/fa';
import { DashboardProps } from '../types';

const Dashboard: React.FC<DashboardProps> = ({ library, playlists, onViewChange }) => {
  const vinylCount: number = library.filter(record => record.type === 'vinyl').length;
  const cdCount: number = library.filter(record => record.type === 'cd').length;
  const totalRecords: number = library.length;
  const totalPlaylists: number = playlists.length;

  interface Stat {
    icon: React.ComponentType<any>;
    label: string;
    value: number;
    color: string;
    onClick: () => void;
  }

  const stats: Stat[] = [
    {
      icon: FaRecordVinyl,
      label: 'Vinyl Records',
      value: vinylCount,
      color: 'from-purple-500 to-purple-700',
      onClick: () => onViewChange('library')
    },
    {
      icon: FaCompactDisc,
      label: 'CDs',
      value: cdCount,
      color: 'from-blue-500 to-purple-600',
      onClick: () => onViewChange('library')
    },
    {
      icon: FaMusic,
      label: 'Total Records',
      value: totalRecords,
      color: 'from-pink-500 to-purple-600',
      onClick: () => onViewChange('library')
    },
    {
      icon: FaListUl,
      label: 'Playlists',
      value: totalPlaylists,
      color: 'from-indigo-500 to-purple-600',
      onClick: () => onViewChange('playlists')
    }
  ];

  const recentlyAdded = library.slice(-3);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, _) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={stat.onClick}
            className="glass glass-hover rounded-xl p-6 cursor-pointer group"
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4 group-hover:animate-pulse`}>
              <stat.icon className="text-white text-xl" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-purple-200">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Recently Added Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-xl p-6"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <FaMusic className="mr-3 text-purple-400" />
          Recently Added
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentlyAdded.map((record, _) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              className="glass glass-hover rounded-lg p-4 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div
                    className={`w-16 h-16 rounded-full ${record.type === 'vinyl' ? 'vinyl-record' : 'cd-disc'} flex items-center hover:animate-spin justify-center shadow-lg`}
                    style={{ backgroundColor: record.coverColor }}
                  >
                    {record.type === 'vinyl' ? (
                      <FaRecordVinyl className="text-white text-sm" />
                    ) : (
                      <FaCompactDisc className="text-gray-600 text-sm" />
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">{record.title}</h3>
                  <p className="text-purple-200 text-sm truncate">{record.artist}</p>
                  <p className="text-purple-300 text-xs">{record.year} • {record.genre}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewChange('library')}
          className="glass glass-hover rounded-xl p-6 text-left group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Browse Library</h3>
              <p className="text-purple-200">Explore your collection with beautiful animations</p>
            </div>
            <FaRecordVinyl className="text-3xl text-purple-400 group-hover:animate-vinyl-spin" />
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewChange('playlists')}
          className="glass glass-hover rounded-xl p-6 text-left group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Manage Playlists</h3>
              <p className="text-purple-200">Create and organize your music collections</p>
            </div>
            <FaListUl className="text-3xl text-purple-400 group-hover:animate-pulse" />
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Dashboard;
