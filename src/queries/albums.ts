import { gql } from '@apollo/client';

export const GET_ALBUMS_BY_ARTIST = gql`
  query GetAlbumsByArtist($artist: String!) {
    getAlbumsByArtist(artist: $artist) {
      id
      artist
      title
      mediaType
      condition
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
    }
  }
`;
