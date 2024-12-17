"use client";

import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query getUserOrders {
    userOrders {
      id
      shippingAddress
      totalAmount
      status
      createdAt
    }
  }
`;
