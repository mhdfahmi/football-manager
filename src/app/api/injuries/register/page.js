"use client";
import { useState } from 'react';

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !password) return alert("Username dan Password wajib diisi!");
    
    setLoading(true);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await res.json();
    setLoading(false);

    if (data.apiKey) {
      setApiKey(data.apiKey);
    } else {
      alert(data.error || "Gagal mendaftar");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Buat Akun Baru</h1>
        <p className="text-gray-500 mb-8">Daftar untuk mendapatkan API KEY unik Anda.</p>

        {!apiKey ? (
          <div className="space-y-4">
            <input 
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
              type="password" 
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button 
              onClick={handleRegister} 
              disabled={loading}
              className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? "Memproses..." : "Daftar & Generate API KEY"}
            </button>
          </div>
        ) : (
          <div className="bg-green-50 p-6 rounded-2xl border border-green-200 text-center animate-in fade-in zoom-in duration-300">
            <p className="text-green-800 font-bold mb-2">Registrasi Berhasil!</p>
            <p className="text-sm text-green-600 mb-4">Simpan API KEY Anda dengan aman:</p>
            <code className="block bg-white p-4 rounded-lg font-mono text-blue-600 font-bold border border-green-200 mb-6 text-lg">
              {apiKey}
            </code>
            <a href="/login" className="block w-full bg-gray-800 text-white py-3 rounded-xl font-bold hover:bg-black transition">
              Lanjut ke Login
            </a>
          </div>
        )}
      </div>
    </main>
  );
}