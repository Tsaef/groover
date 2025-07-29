import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaRecordVinyl, FaCompactDisc, FaMusic, FaEdit } from 'react-icons/fa';
import { PlaylistsProps, Playlist } from '../types';

const Playlists: React.FC<PlaylistsProps> = ({ playlists, setPlaylists, library, onAddToPlaylist }) => {
  const [newPlaylistName, setNewPlaylistName] = useState<string>('');
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [editingPlaylist, setEditingPlaylist] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>('');

  const createPlaylist = (): void => {
    if (newPlaylistName.trim()) {
      const newPlaylist: Playlist = {
        id: Date.now(),
        name: newPlaylistName.trim(),
        records: []
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
      setShowCreateForm(false);
    }
  };

  const deletePlaylist = (playlistId: number): void => {
    setPlaylists(playlists.filter(p => p.id !== playlistId));
    if (selectedPlaylist?.id === playlistId) {
      setSelectedPlaylist(null);
    }
  };

  const removeFromPlaylist = (playlistId: number, recordId: number): void => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          records: playlist.records.filter(r => r.id !== recordId)
        };
      }
      return playlist;
    }));
  };

  const updatePlaylistName = (playlistId: number, newName: string): void => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        return { ...playlist, name: newName };
      }
      return playlist;
    }));
    setEditingPlaylist(null);
  };

  const startEditing = (playlist: Playlist): void => {
    setEditingPlaylist(playlist.id);
    setEditName(playlist.name);
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h2 className="text-3xl font-bold text-white flex items-center">
          <FaMusic className="mr-3 text-purple-400" />
          My Playlists
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 hover:from-purple-700 hover:to-purple-800 transition-all"
        >
          <FaPlus />
          <span>New Playlist</span>
        </motion.button>
      </motion.div>

      {/* Create Playlist Form */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Create New Playlist</h3>
            <div className="flex space-x-4">
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="Playlist name..."
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                onKeyDown={(e) => e.key === 'Enter' && createPlaylist()}
              />
              <button
                onClick={createPlaylist}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Create
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Playlists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Playlists List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">All Playlists</h3>
          {playlists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-xl p-4 cursor-pointer hover:bg-white/20 transition-all"
              onClick={() => setSelectedPlaylist(playlist)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {editingPlaylist === playlist.id ? (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-1 text-white text-lg font-bold"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') updatePlaylistName(playlist.id, editName);
                          if (e.key === 'Escape') setEditingPlaylist(null);
                        }}
                        onBlur={() => updatePlaylistName(playlist.id, editName)}
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
                      startEditing(playlist);
                    }}
                    className="text-purple-400 hover:text-purple-300 p-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePlaylist(playlist.id);
                    }}
                    className="text-red-400 hover:text-red-300 p-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Playlist Details */}
        <div className="glass rounded-xl p-6">
          {selectedPlaylist ? (
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <FaMusic className="mr-2 text-purple-400" />
                {selectedPlaylist.name}
              </h3>

              {selectedPlaylist.records.length === 0 ? (
                <div className="text-center py-8">
                  <FaMusic className="text-4xl text-purple-400 mx-auto mb-4 opacity-50" />
                  <p className="text-purple-300">No records in this playlist yet</p>
                  <p className="text-purple-400 text-sm mt-2">Add records from your library</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedPlaylist.records.map((record, index) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                    >
                      <div className="relative">
                        <div
                          className={`w-12 h-12 rounded-full ${record.type === 'vinyl' ? 'vinyl-record' : 'cd-disc'} flex items-center justify-center shadow-lg`}
                          style={{ backgroundColor: record.coverColor }}
                        >
                          {record.type === 'vinyl' ? (
                            <FaRecordVinyl className="text-white text-xs" />
                          ) : (
                            <FaCompactDisc className="text-gray-600 text-xs" />
                          )}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate">{record.title}</h4>
                        <p className="text-purple-200 text-sm truncate">{record.artist}</p>
                      </div>

                      <button
                        onClick={() => selectedPlaylist && removeFromPlaylist(selectedPlaylist.id, record.id)}
                        className="text-red-400 hover:text-red-300 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Add Records Section */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Add from Library</h4>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {library.filter(record =>
                    !selectedPlaylist.records.find(r => r.id === record.id)
                  ).map((record) => (
                    <motion.button
                      key={record.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectedPlaylist && onAddToPlaylist(selectedPlaylist.id, record)}
                      className="flex items-center space-x-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left"
                    >
                      <div
                        className={`w-8 h-8 rounded-full ${record.type === 'vinyl' ? 'vinyl-record' : 'cd-disc'} flex items-center justify-center`}
                        style={{ backgroundColor: record.coverColor }}
                      >
                        {record.type === 'vinyl' ? (
                          <FaRecordVinyl className="text-white text-xs" />
                        ) : (
                          <FaCompactDisc className="text-gray-600 text-xs" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{record.title}</p>
                        <p className="text-purple-300 text-xs truncate">{record.artist}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <FaMusic className="text-4xl text-purple-400 mx-auto mb-4 opacity-50" />
              <p className="text-purple-300">Select a playlist to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
