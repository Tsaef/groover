import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMusic } from 'react-icons/fa';
import { PlaylistsProps, Playlist } from '../types';
import Button from '../components/ui/Button';
import Tile from '../components/ui/Tile';
import PlaylistItem from '../components/playlists/PlaylistItem';
import PlaylistTrack from '../components/playlists/PlaylistTrack';
import RecordDisc from '../components/records/RecordDisc';

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
        <Button onClick={() => setShowCreateForm(true)}>
          <FaPlus />
          <span>New Playlist</span>
        </Button>
      </motion.div>

      {/* Create Playlist Form */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Tile>
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
                <Button variant="success" onClick={createPlaylist}>
                  Create
                </Button>
                <Button variant="secondary" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </Tile>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Playlists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Playlists List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">All Playlists</h3>
          {playlists.map((playlist, index) => (
            <PlaylistItem
              key={playlist.id}
              playlist={playlist}
              index={index}
              isEditing={editingPlaylist === playlist.id}
              editName={editName}
              onEditNameChange={setEditName}
              onStartEdit={() => startEditing(playlist)}
              onFinishEdit={() => updatePlaylistName(playlist.id, editName)}
              onCancelEdit={() => setEditingPlaylist(null)}
              onDelete={() => deletePlaylist(playlist.id)}
              onSelect={() => setSelectedPlaylist(playlist)}
            />
          ))}
        </div>

        {/* Selected Playlist Details */}
        <Tile>
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
                    <PlaylistTrack
                      key={record.id}
                      record={record}
                      index={index}
                      onRemove={() => selectedPlaylist && removeFromPlaylist(selectedPlaylist.id, record.id)}
                    />
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
                      <RecordDisc
                        type={record.type}
                        coverColor={record.coverColor}
                        size="sm"
                        hover={false}
                      />
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
        </Tile>
      </div>
    </div>
  );
};

export default Playlists;
