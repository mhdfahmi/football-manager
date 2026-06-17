"use client";
import { useState } from 'react';

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    // Memanggil API register yang sudah kita buat sebelumnya
    const res = await fetch('/api/register', { 
      method: 'POST', 
      body: JSON.stringify({ username }) 
    });
    const data = await res.json();
    setGeneratedKey(data.apiKey);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex gap-6 p-6 bg-white border-b items-center">
        <h1 className="font-bold text-xl text-blue-600">FC API HUB</h1>
        <a href="/" className="font-semibold text-gray-600 hover:text-blue-600">Home</a>
        <a href="/login" className="font-semibold text-gray-600 hover:text-blue-600">Login</a>
        <a href="/register" className="font-semibold text-blue-600">Daftar</a>
        <a href="/docs" className="font-semibold text-gray-600 hover:text-blue-600">Dokumentasi</a>
        <a href="/dashboard" className="ml-auto bg-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 transition">Web Client (Dashboard)</a>
      </nav>

      {/* Register Form */}
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
              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
                Daftar & Generate API KEY
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                <p className="text-sm font-bold">API KEY Anda Berhasil Dibuat!</p>
                <p className="text-2xl font-mono mt-2">{generatedKey}</p>
              </div>
              <p className="text-sm text-gray-500">Simpan kunci ini! Anda akan menggunakannya di Dashboard.</p>
              <a href="/dashboard" className="block w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">Pergi ke Dashboard</a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}