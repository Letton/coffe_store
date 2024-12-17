"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import graphqlClient from "@/graphql/gql.setup";

interface ApolloWrapperProps {
  children: ReactNode;
}

export default function ApolloWrapper({ children }: ApolloWrapperProps) {
  return <ApolloProvider client={graphqlClient}>{children}</ApolloProvider>;
}
