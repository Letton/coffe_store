import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/app/Header";
import ApolloWrapper from "@/components/apollo-wrapper";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/userContext";
import { CartProvider } from "@/context/cartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "Coffee Store",
  description: "Coffee Store Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ApolloWrapper>
          <UserProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <CartProvider>
                <Header />
                <main>{children}</main>
                <Toaster />
              </CartProvider>
            </ThemeProvider>
          </UserProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
