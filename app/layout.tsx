import type { Metadata } from "next";

import { MotionProvider } from "@/components/common/MotionProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Maybelle Catolin | Software Engineer",
  description: "Portfolio of Maybelle Catolin, a senior software engineer focused on frontend and mobile experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
