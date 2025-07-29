import { Record } from '../types';

export const mockRecords: Record[] = [
  {
    id: 1,
    title: "Dark Side of the Moon",
    artist: "Pink Floyd",
    year: 1973,
    type: "vinyl",
    genre: "Progressive Rock",
    owned: true,
    coverColor: "#1a1a2e"
  },
  {
    id: 2,
    title: "Thriller",
    artist: "Michael Jackson",
    year: 1982,
    type: "vinyl",
    genre: "Pop",
    owned: true,
    coverColor: "#8b0000"
  },
  {
    id: 3,
    title: "Kind of Blue",
    artist: "Miles Davis",
    year: 1959,
    type: "vinyl",
    genre: "Jazz",
    owned: true,
    coverColor: "#000080"
  },
  {
    id: 4,
    title: "OK Computer",
    artist: "Radiohead",
    year: 1997,
    type: "cd",
    genre: "Alternative Rock",
    owned: true,
    coverColor: "#2d2d2d"
  },
  {
    id: 5,
    title: "Abbey Road",
    artist: "The Beatles",
    year: 1969,
    type: "vinyl",
    genre: "Rock",
    owned: true,
    coverColor: "#ffffff"
  },
  {
    id: 6,
    title: "Nevermind",
    artist: "Nirvana",
    year: 1991,
    type: "cd",
    genre: "Grunge",
    owned: true,
    coverColor: "#87ceeb"
  }
];

export const searchableRecords: Record[] = [
  ...mockRecords,
  {
    id: 7,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    year: 1975,
    type: "vinyl",
    genre: "Rock",
    owned: false,
    coverColor: "#ffd700"
  },
  {
    id: 8,
    title: "Hotel California",
    artist: "Eagles",
    year: 1976,
    type: "vinyl",
    genre: "Rock",
    owned: false,
    coverColor: "#8b4513"
  },
  {
    id: 9,
    title: "Back in Black",
    artist: "AC/DC",
    year: 1980,
    type: "vinyl",
    genre: "Hard Rock",
    owned: false,
    coverColor: "#000000"
  },
  {
    id: 10,
    title: "The Wall",
    artist: "Pink Floyd",
    year: 1979,
    type: "cd",
    genre: "Progressive Rock",
    owned: false,
    coverColor: "#ff6b6b"
  }
];
