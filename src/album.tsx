import { gql } from '@apollo/client';

export const GET_ALBUMS = gql`
  query GetAlbums {
    albums {
      id
      artist
      album
      year
    }
  }
`;
