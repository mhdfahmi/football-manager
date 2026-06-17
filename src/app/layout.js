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

// Metadata yang lebih deskriptif untuk tugas UAS Anda
export const metadata = {
  title: "Football Club Squad Manager | API Project",
  description: "Platform API manajemen skuad klub sepak bola untuk tugas UAS Pemrograman API.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 font-sans">
        
        {/* Konten Utama */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer Modern */}
        <footer className="py-8 text-center text-gray-500 text-sm border-t mt-10">
          <p>© 2026 Football Club Squad Manager. Dibuat untuk Ujian Akhir Semester Pemrograman API.</p>
        </footer>
        
      </body>
    </html>
  );
}