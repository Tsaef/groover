import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPlus } from 'react-icons/fa';
import { Record, Playlist } from '../../types';
import RecordDisc from './RecordDisc';
import Button from '../ui/Button';

interface RecordModalProps {
  record: Record | null;
  playlists: Playlist[];
  onClose: () => void;
  onAddToPlaylist: (playlistId: number, record: Record) => void;
}

const RecordModal: React.FC<RecordModalProps> = ({
  record,
  playlists,
  onClose,
  onAddToPlaylist
}) => {
  if (!record) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
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
              className="mx-auto mb-4"
              animate={{ rotateY: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <RecordDisc
                type={record.type}
                coverColor={record.coverColor}
                size="xl"
                spinning={false}
                hover={false}
              />
            </motion.div>

            <h2 className="text-2xl font-bold text-white mb-2">{record.title}</h2>
            <p className="text-purple-200 text-lg mb-1">{record.artist}</p>
            <p className="text-purple-300">{record.year} • {record.genre}</p>
          </div>

          <div className="space-y-3">
            <Button className="w-full">
              <FaPlay className="text-sm" />
              <span>Play</span>
            </Button>

            <div className="space-y-2">
              <p className="text-purple-200 text-sm font-medium">Add to Playlist:</p>
              {playlists.map((playlist) => (
                <Button
                  key={playlist.id}
                  variant="secondary"
                  onClick={() => onAddToPlaylist(playlist.id, record)}
                  className="w-full"
                >
                  <FaPlus className="text-sm" />
                  <span>{playlist.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RecordModal;
