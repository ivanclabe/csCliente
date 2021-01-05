import { gql } from '@apollo/client';

export const GET_PROVEEDORES = gql`
  query GetProveedores(
    $query: [QueryOperationInput!]!
    $first: Int
    $last: Int
    $after: String
    $before: String
    $sortBy: String
    $sortOrder: SortOperation
  ) {
    getProveedores(
      query: $query
      first: $first
      last: $last
      after: $after
      before: $before
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      totalCount
      edges {
        node {
          id
          did
          nombre
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
