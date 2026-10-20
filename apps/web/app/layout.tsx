import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wael Antar | Software Engineer",
  description: "Wael Antar's software engineering portfolio.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
