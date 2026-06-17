"use client";

export default function Home() {
  const features = [
    { id: "endpoints", icon: "📊", title: "8 Endpoints", desc: "Dokumentasi lengkap untuk semua resource.", href: "/docs" },
    { id: "crud", icon: "⚡", title: "CRUD Ready", desc: "Mendukung metode GET, POST, PUT, DELETE.", href: "/dashboard" },
    { id: "security", icon: "🔒", title: "Secure API", desc: "Autentikasi aman dengan API KEY.", href: "/login" },
    { id: "live", icon: "📡", title: "Live Data", desc: "Update statistik real-time.", href: "/dashboard" }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex gap-6 p-6 bg-white border-b items-center">
        <h1 className="font-bold text-xl text-blue-600">FC API HUB</h1>
        <a href="/" className="font-semibold text-gray-600 hover:text-blue-600">Home</a>
        <a href="/login" className="font-semibold text-gray-600 hover:text-blue-600">Login</a>
        <a href="/dashboard" className="ml-auto bg-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 transition">Web Client</a>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold mb-6">
          Football Club <span className="text-blue-600">Squad Management API</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Platform API untuk mengelola data pemain, riwayat cedera, dan statistik tim secara real-time.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/register" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition">Daftar Sekarang</a>
        </div>
      </header>

      {/* Peringatan Login (Meniru referensi gambar Anda) */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <div className="bg-amber-100 border-l-4 border-amber-500 p-6 rounded-r-2xl shadow-sm text-amber-900">
          <p className="font-bold">🔑 Anda harus login terlebih dahulu untuk mendapatkan API KEY.</p>
          <p className="text-sm">API KEY digunakan untuk mengakses semua endpoint dalam sistem ini.</p>
        </div>
      </section>

      {/* Grid Features */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
        {features.map((item) => (
          <div 
            key={item.id} 
            onClick={() => window.location.href = item.href}
            className="bg-white p-6 rounded-2xl shadow-sm border cursor-pointer hover:shadow-xl hover:border-blue-300 transition transform hover:-translate-y-1"
          >
            <div className="text-3xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-400 text-sm border-t">
        <p>&copy; 2026 Football Club API Hub. Dibuat untuk Ujian Akhir Semester.</p>
      </footer>
    </main>
  );
}