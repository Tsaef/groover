import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Playlist } from '../../types';
import Tile from '../ui/Tile';

interface PlaylistItemProps {
  playlist: Playlist;
  index: number;
  isEditing: boolean;
  editName: string;
  onEditNameChange: (name: string) => void;
  onStartEdit: () => void;
  onFinishEdit: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
  onSelect: () => void;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  playlist,
  index,
  isEditing,
  editName,
  onEditNameChange,
  onStartEdit,
  onFinishEdit,
  onCancelEdit,
  onDelete,
  onSelect
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Tile onClick={onSelect}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {isEditing ? (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => onEditNameChange(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-1 text-white text-lg font-bold"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onFinishEdit();
                    if (e.key === 'Escape') onCancelEdit();
                  }}
                  onBlur={onFinishEdit}
                  autoFocus
                />
              </div>
            ) : (
              <div>
                <h4 className="text-lg font-bold text-white">{playlist.name}</h4>
                <p className="text-purple-200 text-sm">{playlist.records.length} tracks</p>
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartEdit();
              }}
              className="text-purple-400 hover:text-purple-300 p-2"
            >
              <FaEdit />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-red-400 hover:text-red-300 p-2"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </Tile>
    </motion.div>
  );
};

export default PlaylistItem;
