"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // Tambahkan state password
  const [generatedKey, setGeneratedKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mengirim username DAN password agar sesuai dengan api/register/route.js
      const res = await fetch('/api/register', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }) 
      });

      const data = await res.json();

      if (res.ok) {
        setGeneratedKey(data.apiKey);
        // Opsional: Simpan ke localStorage agar otomatis bisa login di dashboard
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
    <main className="min-h-screen bg-gray-50">
      <nav className="flex gap-6 p-6 bg-white border-b items-center">
        <h1 className="font-bold text-xl text-blue-600">FC API HUB</h1>
        <a href="/" className="font-semibold text-gray-600 hover:text-blue-600">Home</a>
        <a href="/login" className="font-semibold text-gray-600 hover:text-blue-600">Login</a>
        <a href="/register" className="font-semibold text-blue-600">Daftar</a>
        <a href="/dashboard" className="ml-auto bg-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 transition">Dashboard</a>
      </nav>

      <section className="flex justify-center items-center py-20">
        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Buat Akun Baru</h2>
          
          {!generatedKey ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input 
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="Pilih username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  required
                  type="password"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="Pilih password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "Memproses..." : "Daftar & Generate API KEY"}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                <p className="text-sm font-bold">API KEY Berhasil Dibuat!</p>
                <p className="text-xl font-mono mt-2 break-all">{generatedKey}</p>
              </div>
              <p className="text-sm text-gray-500">Simpan kunci ini untuk mengakses dashboard.</p>
              <button 
                onClick={() => router.push('/dashboard')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
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