"use client";

import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation createOrder(
    $shippingAddress: String!
    $orderItems: [OrderItemInput!]!
  ) {
    createOrder(
      createOrderInput: {
        shippingAddress: $shippingAddress
        orderItems: $orderItems
      }
    ) {
      id
      userId
      shippingAddress
      totalAmount
      status
      orderItems {
        productId
        quantity
        totalPrice
      }
    }
  }
`;
