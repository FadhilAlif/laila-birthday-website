import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Laila Birthday",
  description: "Happy Birthday Laila! Special birthday website with love ❤️",
  icons: {
    icon: [
      { url: "/assets/love_icon_lala.svg" },
      {
        url: "/assets/love_icon_lala.svg",
        type: "image/svg+xml",
        sizes: "32x32",
      },
    ],
    apple: "/assets/love_icon_lala.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
