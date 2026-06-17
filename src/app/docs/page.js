"use client";

export default function DocsPage() {
  const endpoints = [
    { method: "GET", path: "/api/players", desc: "Mengambil semua data pemain" },
    { method: "POST", path: "/api/players", desc: "Menambahkan data pemain baru" },
    { method: "DELETE", path: "/api/players", desc: "Menghapus data pemain" },
    { method: "POST", path: "/api/register", desc: "Generate API Key untuk akses" },
    { method: "GET", path: "/api/injuries", desc: "Mengambil data riwayat cedera" },
    { method: "POST", path: "/api/injuries", desc: "Menambahkan data cedera baru" },
    { method: "GET", path: "/api/stats", desc: "Mengambil laporan statistik sistem" },
    { method: "GET", path: "/api/profile", desc: "Mengambil profil pengguna aktif" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-2">API Documentation</h1>
        <p className="text-gray-600 mb-8">Daftar endpoint sistem manajemen FC yang tersedia.</p>
        
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 border-b font-bold">Method</th>
                <th className="p-4 border-b font-bold">Endpoint</th>
                <th className="p-4 border-b font-bold">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              {endpoints.map((e, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="p-4 border-b font-mono font-bold text-blue-600">{e.method}</td>
                  <td className="p-4 border-b font-mono">{e.path}</td>
                  <td className="p-4 border-b text-gray-600">{e.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}