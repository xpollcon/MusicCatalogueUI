import { gql } from '@apollo/client';

export const GET_ALBUMS_BY_ARTIST = gql`
  query GetAlbumsByArtist($artist: String!) {
    getAlbumsByArtist(artist: $artist) {
      id
      artist
      title
      mediaType
      condition
      username
    }
  }
`;

export const LIST_ALL_ALBUMS = gql`
  query ListAllAlbums {
    listAllAlbums {
      id
      artist
      title
      mediaType
      condition
      username
    }
  }
`;

export const ADD_ALBUM = gql`
  mutation AddAlbum($artist: String!, $title: String!, $mediaType: String!, $condition: String!) {
    addAlbum(artist: $artist, title: $title, mediaType: $mediaType, condition: $condition) {
      id
      artist
      title
      mediaType
      condition
      username
    }
  }
`;
