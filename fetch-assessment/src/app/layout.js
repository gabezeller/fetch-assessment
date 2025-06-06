import { Geist, Geist_Mono, DynaPuff, Comic_Neue, PT_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const dynaPuff = DynaPuff({
  variable: "--font-dyna-puff",
  subsets:["cyrillic-ext", "latin", "latin-ext"],
});

const comic = Comic_Neue({
  variable: "--font-comic-neue",
  subsets:["latin"],
  weight:['300', '400', '700'],
});


const ptSerif = PT_Serif({
  variable: "--font-PT-serif",
  subsets:["latin"],
  weight:['400', '700'],
});

export const metadata = {
  title: "Fido Finder",
  description: "Find your best friend today",
  icon: "/images/icon.png"
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={ptSerif.className}>
        {children}
      </body>
    </html>
  );
}
