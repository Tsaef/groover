export interface Record {
  id: number;
  title: string;
  artist: string;
  year: number;
  type: 'vinyl' | 'cd';
  genre: string;
  owned: boolean;
  coverColor: string;
}

export interface Playlist {
  id: number;
  name: string;
  records: Record[];
}

export interface DashboardProps {
  library: Record[];
  playlists: Playlist[];
  onViewChange: (view: ViewType, filter?: RecordType) => void;
}

export interface LibraryProps {
  records: Record[];
  onAddToPlaylist: (playlistId: number, record: Record) => void;
  playlists: Playlist[];
  initialFilter?: RecordType;
}

export interface PlaylistsProps {
  playlists: Playlist[];
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  library: Record[];
  onAddToPlaylist: (playlistId: number, record: Record) => void;
}

export interface SearchBarProps {
  onAddToLibrary: (record: Record) => void;
  library: Record[];
}

export type RecordType = 'all' | 'vinyl' | 'cd';
export type ViewType = 'dashboard' | 'library' | 'playlists';
