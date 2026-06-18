"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/register', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }) 
      });

      const data = await res.json();

      if (res.ok) {
        setGeneratedKey(data.apiKey);
        localStorage.setItem('apiKey', data.apiKey);
      } else {
        alert(data.error || "Gagal mendaftar");
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6">
      {/* Navigasi */}
      <nav className="flex gap-6 p-6 bg-slate-900 rounded-2xl border border-slate-800 items-center mb-10">
        <h1 className="font-bold text-xl text-emerald-400">FC API HUB</h1>
        <a href="/" className="font-semibold text-slate-400 hover:text-emerald-400">Home</a>
        <a href="/login" className="font-semibold text-slate-400 hover:text-emerald-400">Login</a>
        <a href="/register" className="font-semibold text-emerald-400 border-b-2 border-emerald-400">Daftar</a>
        <a href="/dashboard" className="ml-auto bg-emerald-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-emerald-500 transition">Dashboard</a>
      </nav>

      {/* Form Register */}
      <section className="flex justify-center items-center py-10">
        <div className="bg-slate-900 p-10 rounded-3xl shadow-2xl border border-slate-800 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-8 text-white text-center">Buat Akun Baru</h2>
          
          {!generatedKey ? (
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Username</label>
                <input 
                  required
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500 transition" 
                  placeholder="Masukkan username..." 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                <input 
                  required
                  type="password"
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500 transition" 
                  placeholder="Masukkan password..." 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-500 transition disabled:opacity-50"
              >
                {loading ? "Memproses..." : "Daftar & Generate API KEY"}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="p-6 bg-slate-950 text-emerald-400 rounded-2xl border border-emerald-500/30">
                <p className="text-sm font-bold uppercase tracking-wider">API KEY Berhasil Dibuat!</p>
                <p className="text-xl font-mono mt-3 break-all bg-slate-900 p-3 rounded-lg border border-slate-800">{generatedKey}</p>
              </div>
              <p className="text-sm text-slate-500">Simpan kunci ini untuk mengakses dashboard.</p>
              <button 
                onClick={() => router.push('/dashboard')}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-500 transition"
              >
                Pergi ke Dashboard
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}