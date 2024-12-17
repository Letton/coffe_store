"use client";

import { gql } from "@apollo/client";

export const ACTIVATION = gql`
  mutation activate($activationToken: String!, $activationCode: String!) {
    activate(
      activateInput: {
        activationToken: $activationToken
        activationCode: $activationCode
      }
    ) {
      id
      email
      username
      role
    }
  }
`;
