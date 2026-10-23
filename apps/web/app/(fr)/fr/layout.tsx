import type { Metadata } from "next";
import { siteOrigin } from "@/lib/site-url";
import "../../globals.css";

export const metadata: Metadata = {
  metadataBase: siteOrigin,
  title: "Wael Antar | Ingénieur logiciel",
  description: "Le portfolio d’ingénierie logicielle de Wael Antar.",
  robots: { index: false, follow: false },
};

export default function FrenchRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script src="/theme-init.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}
