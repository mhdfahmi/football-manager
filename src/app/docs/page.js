"use client";
import Link from 'next/link'; // Import Link dari next/link

export default function DocsPage() {
  const endpoints = [
    { method: "GET", path: "/api/players", desc: "Mengambil semua data pemain" },
    { method: "POST", path: "/api/players", desc: "Menambahkan data pemain baru" },
    { method: "PUT", path: "/api/players", desc: "Memperbarui data pemain" },
    { method: "DELETE", path: "/api/players", desc: "Menghapus data pemain" },
    { method: "POST", path: "/api/register", desc: "Generate API Key untuk akses" },
    { method: "GET", path: "/api/injuries", desc: "Mengambil data riwayat cedera" },
    { method: "POST", path: "/api/injuries", desc: "Menambahkan data cedera baru" },
    { method: "GET", path: "/api/stats", desc: "Mengambil laporan statistik sistem" },
    { method: "GET", path: "/api/profile", desc: "Mengambil profil pengguna aktif" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-slate-100 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Tombol Kembali */}
        <Link href="/dashboard" className="inline-block mb-6 text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-2 transition">
          ← Kembali ke Dashboard
        </Link>

        <h1 className="text-4xl font-extrabold mb-2 text-emerald-400">API Documentation</h1>
        <p className="text-slate-400 mb-8">Daftar lengkap endpoint sistem manajemen FC yang tersedia untuk integrasi.</p>
        
        <div className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-6 border-b border-slate-700 font-bold text-slate-200">Method</th>
                <th className="p-6 border-b border-slate-700 font-bold text-slate-200">Endpoint</th>
                <th className="p-6 border-b border-slate-700 font-bold text-slate-200">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              {endpoints.map((e, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition">
                  <td className="p-6 border-b border-slate-800 font-mono font-bold text-emerald-500">
                    {e.method}
                  </td>
                  <td className="p-6 border-b border-slate-800 font-mono text-slate-300">
                    {e.path}
                  </td>
                  <td className="p-6 border-b border-slate-800 text-slate-400">
                    {e.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}