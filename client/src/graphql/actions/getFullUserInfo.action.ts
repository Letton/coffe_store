"use client";

import { gql } from "@apollo/client";

export const GET_FULL_USER_INFO = gql`
  query {
    getMe {
      user {
        id
        email
        username
        role
      }
    }
  }
`;
