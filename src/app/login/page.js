"use client";
import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login berhasil untuk user: " + username);
    // Di sini Anda bisa arahkan ke halaman dashboard
    window.location.href = "/dashboard";
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar yang konsisten */}
      <nav className="flex gap-6 p-6 bg-white border-b items-center">
        <h1 className="font-bold text-xl text-blue-600">FC API HUB</h1>
        <a href="/" className="font-semibold text-gray-600 hover:text-blue-600">Home</a>
        <a href="/login" className="font-semibold text-blue-600">Login</a>
        <a href="/register" className="font-semibold text-gray-600 hover:text-blue-600">Daftar</a>
        <a href="/docs" className="font-semibold text-gray-600 hover:text-blue-600">Dokumentasi</a>
        <a href="/dashboard" className="ml-auto bg-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 transition">Web Client (Dashboard)</a>
      </nav>

      {/* Login Form */}
      <section className="flex justify-center items-center py-20">
        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login ke Akun Anda</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input 
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="Masukkan username Anda" 
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
                placeholder="********" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition mt-4"
            >
              Masuk
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Belum punya akun? <a href="/register" className="text-blue-600 font-bold">Daftar sekarang</a>
          </p>
        </div>
      </section>
    </main>
  );
}