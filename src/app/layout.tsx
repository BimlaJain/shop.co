import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shop.co",
  description: "FIND CLOTHES THAT MATCHES YOUR STYLE",
  openGraph: {
    title: "Shop.co",
    description: "FIND CLOTHES THAT MATCHES YOUR STYLE ",
    images: [
      {
        url: "/meta-img.png",
        width: 900,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`ff-satoshi antialiased scroll-smooth `}
      >
        {children}
      </body>
    </html>
  );
}
