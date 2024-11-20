import type { Metadata } from "next";
import "./globals.css";
import {ThemeProvider} from "../components/theme-provider";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import Header from "../components/Header";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "Admin Management Tool",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
        variables: {
          colorPrimary: '#3b82f6',
          colorBackground: '#1a202c',
          colorInputBackground: '#2d3748',
          colorInputText: '#F3F4F6'
        },
        elements: {
          formButtonPrimary: 'text-white',
          card: 'bg-gray-800',
          headerTitle: 'text-blue-400',
          headerSubtitle: 'text-gray-100'
        }
      }}
    >
    <html lang="en">      
        <body className={`${inter.className} dotted-background`}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
          </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
