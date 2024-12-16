"use client";

import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      accessToken
      refreshToken
      user {
        email
        username
        role
      }
    }
  }
`;
