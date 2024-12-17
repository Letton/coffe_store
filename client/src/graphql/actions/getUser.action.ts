"use client";

import { gql } from "@apollo/client";

export const GET_USER = gql`
  query {
    getMe {
      user {
        username
        role
      }
    }
  }
`;
