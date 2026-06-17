"use client";
import { useState } from 'react';

export default function DashboardPage() {
  const [apiKey, setApiKey] = useState("");
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  // Fungsi untuk Logout
  const handleLogout = () => {
    setApiKey("");
    setPlayers([]);
    alert("Anda telah berhasil logout.");
    window.location.href = '/login';
  };

  const fetchPlayers = async () => {
    if (!apiKey) return alert("Masukkan API KEY Anda di kolom atas!");
    const res = await fetch('/api/players', { headers: { 'Authorization': apiKey } });
    if (res.status === 401) return alert("API KEY tidak valid!");
    const data = await res.json();
    setPlayers(data);
  };

  const checkStats = async () => {
    const res = await fetch('/api/stats');
    const data = await res.json();
    alert(`Statistik Sistem:\nTotal Pemain: ${data.totalPlayers}\nStatus: ${data.systemStatus}`);
  };

  const checkProfile = async () => {
    if (!apiKey) return alert("Masukkan API Key terlebih dahulu!");
    const res = await fetch('/api/profile', { headers: { 'Authorization': apiKey } });
    const data = await res.json();
    alert(`Profil Pengguna:\nUser: ${data.username}\nRole: ${data.role}`);
  };

  const addPlayer = async () => {
    if (!name || !position) return alert("Lengkapi data pemain!");
    await fetch('/api/players', {
      method: 'POST',
      headers: { 'Authorization': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, position, number: 7 })
    });
    setName(""); setPosition("");
    fetchPlayers();
  };

  const deletePlayer = async (id) => {
    await fetch('/api/players', {
      method: 'DELETE',
      headers: { 'Authorization': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchPlayers();
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {/* Navbar yang lebih lengkap dengan Logout */}
      <nav className="flex gap-6 p-4 bg-white border-b items-center rounded-2xl mb-6 shadow-sm">
        <h1 className="font-bold text-xl text-blue-600">FC API HUB</h1>
        <a href="/" className="font-semibold text-gray-600 hover:text-blue-600">Home</a>
        <a href="/dashboard" className="font-semibold text-blue-600">Dashboard</a>
        <button onClick={handleLogout} className="ml-auto text-red-500 font-bold hover:underline">Logout</button>
      </nav>

      {/* Stats & Profile Section */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6 mb-8">
        <button onClick={checkStats} className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg hover:bg-blue-700 transition text-left">
          <h3 className="font-bold text-lg">📊 Cek Statistik</h3>
          <p className="text-blue-100 text-sm">Lihat ringkasan data sistem</p>
        </button>
        <button onClick={checkProfile} className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg hover:bg-black transition text-left">
          <h3 className="font-bold text-lg">👤 Cek Profil</h3>
          <p className="text-gray-300 text-sm">Lihat info akun Anda</p>
        </button>
      </div>

      <section className="max-w-4xl mx-auto">
        {/* Input API Key */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border mb-6 flex gap-4">
          <input className="flex-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="Paste API KEY Anda..." value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
          <button onClick={fetchPlayers} className="bg-gray-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-black transition">Load Data</button>
        </div>

        {/* CRUD Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8">
          <h3 className="font-bold mb-4">Tambah Pemain Baru</h3>
          <div className="flex gap-4">
            <input className="flex-1 p-3 border rounded-lg outline-none" placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="flex-1 p-3 border rounded-lg outline-none" placeholder="Posisi" value={position} onChange={(e) => setPosition(e.target.value)} />
            <button onClick={addPlayer} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700">Tambah</button>
          </div>
        </div>

        {/* Data List */}
        <div className="grid gap-4">
          {players.length === 0 && <p className="text-center text-gray-400 py-10">Belum ada data pemain. Silahkan load data atau tambah pemain.</p>}
          {players.map(p => (
            <div key={p.id} className="bg-white p-4 rounded-xl border flex justify-between items-center shadow-sm hover:shadow-md transition">
              <p className="font-bold">{p.name} <span className="text-gray-400 font-normal">({p.position})</span></p>
              <button onClick={() => deletePlayer(p.id)} className="text-red-500 font-bold text-sm hover:underline">Hapus</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}