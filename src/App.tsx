import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {FaMusic} from "react-icons/fa";
import {Playlist, Record, RecordType, ViewType} from './types';
import {mockRecords} from './data/mockData';
import SearchBar from './components/SearchBar';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import Playlists from './pages/Playlists';

function App(): JSX.Element {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [library, setLibrary] = useState<Record[]>(mockRecords);
  const [libraryFilter, setLibraryFilter] = useState<RecordType>('all');
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { id: 1, name: 'Favorites', records: [] },
    { id: 2, name: 'Rock Classics', records: [] },
    { id: 3, name: 'Jazz Collection', records: [] }
  ]);

  const addToLibrary = (record: Record): void => {
    const exists = library.find(r => r.id === record.id);
    if (!exists) {
      setLibrary([...library, { ...record, owned: true }]);
    }
  };

  const addToPlaylist = (playlistId: number, record: Record): void => {
    if (!record.owned) return;

    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        const exists = playlist.records.find(r => r.id === record.id);
        if (!exists) {
          return { ...playlist, records: [...playlist.records, record] };
        }
      }
      return playlist;
    }));
  };

  const handleViewChange = (view: ViewType, filter?: RecordType): void => {
    setCurrentView(view);
    if (view === 'library' && filter) {
      setLibraryFilter(filter);
    }
  };

  const renderPage = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            library={library}
            playlists={playlists}
            onViewChange={handleViewChange}
          />
        );
      case 'library':
        return (
          <Library
            records={library}
            onAddToPlaylist={addToPlaylist}
            playlists={playlists}
            initialFilter={libraryFilter}
          />
        );
      case 'playlists':
        return (
          <Playlists
            playlists={playlists}
            setPlaylists={setPlaylists}
            library={library}
            onAddToPlaylist={addToPlaylist}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 animate-glow">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-6"
      >
        {/* Header */}
        <motion.header
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="text-center mb-8 "

        >
          <div className="flex flex-row gap-6 justify-center items-center">
            <FaMusic className="text-white" size={48} />
            <h1 className="text-5xl font-bold text-white mb-2 hover:cursor-pointer" onClick={() => setCurrentView('dashboard')}>
              Groover
            </h1>
          </div>
          <p className="text-purple-200 text-lg">Your Personal Vinyl & CD Library</p>
        </motion.header>

        {/* Search Bar */}
        <SearchBar
          onAddToLibrary={addToLibrary}
          library={library}
        />

        {/* Main Content */}
        <motion.main
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderPage()}
        </motion.main>
      </motion.div>
    </div>
  );
}

export default App;
