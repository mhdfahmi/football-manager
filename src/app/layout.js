import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FC API HUB | Squad Manager",
  description: "Platform manajemen skuad klub sepak bola untuk UAS Pemrograman API.",
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="id" 
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}
    >
      {/* bg-slate-950: Background gelap 
         text-slate-100: Warna teks cerah
         antialiased: Membuat teks lebih halus di layar
      */}
      <body className="h-full bg-slate-950 text-slate-100 antialiased font-sans selection:bg-emerald-500 selection:text-white">
        
        {/* Wrapper utama agar konten tidak terlalu melebar 
           dan tetap terlihat rapi di layar lebar
        */}
        <main className="min-h-screen">
          {children}
        </main>

       
        
      </body>
    </html>
  );
}