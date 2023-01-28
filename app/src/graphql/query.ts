import { gql } from "@apollo/client";

export const LOAD_TITLE = gql`
  query search($title: String!) {
    search(title: $title) {
        Title
        Year
        imdbID
        Type
        Poster
    }
  }
`;