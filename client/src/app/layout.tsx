import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Sidebar_Bottom from "./components/Sidebar_Bottom";


// const poppins = Poppins({
//   weight: '400',
//   subsets: ['latin'],
// })
const poppins = Poppins({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable}`}
      >
        <main className="flex flex-col">
          <Navbar />
          <section className="flex">
            <Sidebar />
            {children}
          </section>
          <Sidebar_Bottom />
        </main>
      </body>
    </html>
  );
}
