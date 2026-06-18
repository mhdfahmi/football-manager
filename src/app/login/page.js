"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Tambahan: Redirect otomatis jika sudah punya API Key
  useEffect(() => {
    if (localStorage.getItem('apiKey')) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok && data.apiKey) {
        localStorage.setItem('apiKey', data.apiKey);
        // Menambahkan feedback visual
        alert("Login berhasil! Mengarahkan ke dashboard...");
        router.push('/dashboard');
      } else {
        // Pesan error lebih spesifik
        alert(data.error || "Username atau password salah!");
      }
    } catch (error) {
      alert("Gagal terhubung ke server. Pastikan server API berjalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <nav className="flex items-center justify-between p-6 border-b border-slate-800">
        <h1 className="font-bold text-xl text-emerald-400">FC API HUB</h1>
        <div className="space-x-6">
          <a href="/" className="hover:text-emerald-400 transition">Home</a>
          <a href="/login" className="text-emerald-400 font-bold underline">Login</a>
          <a href="/register" className="hover:text-emerald-400 transition">Daftar</a>
        </div>
      </nav>

      <section className="flex justify-center items-center py-20">
        <div className="bg-slate-900 p-10 rounded-3xl shadow-2xl border border-slate-800 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Login ke Akun Anda</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Username</label>
              <input 
                required
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition" 
                placeholder="Masukkan username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
              <input 
                required
                type="password"
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition" 
                placeholder="********" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-500 transition mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
          <p className="text-center text-sm text-slate-400 mt-6">
            Belum punya akun? <a href="/register" className="text-emerald-400 font-bold hover:underline">Daftar sekarang</a>
          </p>
        </div>
      </section>
    </main>
  );
}