"use client";

export default function Home() {
  const features = [
    { id: "endpoints", icon: "📊", title: "9 Endpoints", desc: "Dokumentasi lengkap untuk semua resource.", href: "/docs" },
    { id: "crud", icon: "⚡", title: "CRUD Ready", desc: "Mendukung metode GET, POST, PUT, DELETE.", href: "/dashboard" },
    { id: "security", icon: "🔒", title: "Secure API", desc: "Autentikasi aman dengan API KEY.", href: "/login" },
    { id: "live", icon: "📡", title: "Live Data", desc: "Update statistik real-time.", href: "/dashboard" }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30">
      {/* Navbar Minimalis */}
      <nav className="flex items-center justify-between p-6 border-b border-slate-800">
        <h1 className="font-bold text-xl text-emerald-400 tracking-tight">FC SQUAD MANAGER</h1>
        <div className="flex gap-6 items-center">
          <a href="/" className="hover:text-emerald-400 transition">Home</a>
          <a href="/login" className="hover:text-emerald-400 transition">Login</a>
          <a href="/dashboard" className="bg-emerald-600 px-5 py-2 rounded-lg font-bold hover:bg-emerald-500 transition shadow-lg shadow-emerald-900/20">Web Client</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tighter">
          Football Club <span className="text-emerald-400">Squad Management API</span>
        </h1>
        <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Platform API profesional untuk mengelola data pemain, riwayat cedera, dan statistik tim secara real-time.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/register" className="bg-white text-slate-950 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition shadow-xl">Daftar Sekarang</a>
        </div>
      </header>

      {/* Info Warning (Dark Mode Style) */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-slate-900 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-xl">
          <p className="font-bold text-emerald-400 flex items-center gap-2">
            <span>🔑</span> Akses Terproteksi
          </p>
          <p className="text-sm text-slate-400 mt-1">Anda harus login atau memiliki API KEY untuk dapat mengakses dashboard dan endpoint data pemain.</p>
        </div>
      </section>

      {/* Grid Features */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
        {features.map((item) => (
          <div 
            key={item.id} 
            onClick={() => window.location.href = item.href}
            className="bg-slate-900 p-6 rounded-2xl border border-slate-800 cursor-pointer hover:border-emerald-500 transition hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="text-3xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold mb-1">{item.title}</h3>
            <p className="text-slate-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Single Footer */}
      <footer className="py-10 text-center text-slate-600 text-sm border-t border-slate-900">
        <p>&copy; 2026 Football Club Squad Manager. Kelompok 6 .</p>
      </footer>
    </main>
  );
}