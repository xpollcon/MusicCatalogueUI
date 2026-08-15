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
  mutation AddAlbum($artist: String!, $title: String!, $mediaType: MediaType!, $condition: String!) {
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

export const UPDATE_ALBUM = gql`
  mutation UpdateAlbum($id: String!, $artist: String!, $title: String!, $mediaType: MediaType!, $condition: String!) {
    updateAlbum(id: $id, artist: $artist, title: $title, mediaType: $mediaType, condition: $condition) {
      id
      artist
      title
      mediaType
      condition
      username
    }
  }
`;

export const DELETE_ALBUM = gql`
  mutation DeleteAlbum($id: String!) {
    deleteAlbum(id: $id)
  }
`;
