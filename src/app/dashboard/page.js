"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState("");
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, title: "", message: "", type: "info" });
  
  const [updateModal, setUpdateModal] = useState({ show: false, player: null });
  const [deleteModal, setDeleteModal] = useState({ show: false, playerId: null });

  useEffect(() => {
    const savedApiKey = localStorage.getItem('apiKey');
    if (!savedApiKey) router.push('/login');
    else setApiKey(savedApiKey);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('apiKey');
    router.push('/login');
  };

  const showNotification = (title, message, type = "info") => setModal({ show: true, title, message, type });

  const fetchPlayers = async () => {
    if (!apiKey) return showNotification("Error", "Masukkan API KEY Anda!");
    setLoading(true);
    try {
      const res = await fetch('/api/players', { headers: { 'Authorization': apiKey } });
      const data = await res.json();
      if (res.ok) setPlayers(data);
      else showNotification("Akses Ditolak", "API KEY tidak valid!", "error");
    } catch (err) {
      showNotification("Error", "Gagal memuat data pemain.");
    } finally {
      setLoading(false);
    }
  };

  const addPlayer = async () => {
    if (!name || !position) return showNotification("Peringatan", "Lengkapi form pemain!");
    setActionLoading(true);
    await fetch('/api/players', {
      method: 'POST',
      headers: { 'Authorization': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, position })
    });
    setName(""); setPosition("");
    fetchPlayers();
    setActionLoading(false);
  };

  // PERBAIKAN: Fungsi deletePlayer yang lebih stabil
  const deletePlayer = async () => {
    if (!deleteModal.playerId) return;
    try {
      const res = await fetch(`/api/players`, {
        method: 'DELETE',
        headers: { 
          'Authorization': apiKey, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ id: deleteModal.playerId })
      });
      
      if (res.ok) {
        setDeleteModal({ show: false, playerId: null });
        fetchPlayers();
      } else {
        showNotification("Gagal", "Server menolak penghapusan. Periksa ID pemain.");
      }
    } catch (err) {
      showNotification("Error", "Koneksi ke API gagal.");
    }
  };

  const updatePlayer = async () => {
    if (!updateModal.player) return;
    await fetch('/api/players', {
      method: 'PUT',
      headers: { 'Authorization': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(updateModal.player)
    });
    setUpdateModal({ show: false, player: null });
    fetchPlayers();
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      {/* Modal Notifikasi */}
      {modal.show && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-2 text-white">{modal.title}</h2>
            <p className="text-slate-400 mb-6">{modal.message}</p>
            <button onClick={() => setModal({ ...modal, show: false })} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-500 transition">Mengerti</button>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4 text-white">Konfirmasi Hapus</h2>
            <p className="text-slate-400 mb-6">Anda yakin ingin menghapus pemain ini?</p>
            <div className="flex gap-2">
              <button onClick={deletePlayer} className="flex-1 bg-red-600 py-3 rounded-xl font-bold hover:bg-red-500">Ya, Hapus</button>
              <button onClick={() => setDeleteModal({ show: false, playerId: null })} className="flex-1 bg-slate-700 py-3 rounded-xl font-bold hover:bg-slate-600">Batal</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Update */}
      {updateModal.show && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4 text-white">Edit Pemain</h2>
            <input className="w-full p-4 mb-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none" value={updateModal.player.name} onChange={e => setUpdateModal({...updateModal, player: {...updateModal.player, name: e.target.value}})} />
            <select className="w-full p-4 mb-6 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none" value={updateModal.player.position} onChange={e => setUpdateModal({...updateModal, player: {...updateModal.player, position: e.target.value}})}>
              <option value="Striker">Striker</option><option value="Midfielder">Midfielder</option><option value="Center Back">Center Back</option><option value="Keeper">Keeper</option>
            </select>
            <div className="flex gap-2">
              <button onClick={updatePlayer} className="flex-1 bg-emerald-600 py-3 rounded-xl font-bold">Simpan</button>
              <button onClick={() => setUpdateModal({show: false, player: null})} className="flex-1 bg-slate-700 py-3 rounded-xl font-bold">Batal</button>
            </div>
          </div>
        </div>
      )}
      
      <nav className="flex items-center justify-between p-6 bg-slate-900 rounded-2xl border border-slate-800 mb-8">
        <h1 className="font-bold text-xl text-emerald-400">FC API HUB</h1>
        <button onClick={handleLogout} className="text-red-400 font-bold hover:underline">Logout</button>
      </nav>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <button onClick={async () => {
            const res = await fetch('/api/stats');
            const data = await res.json();
            showNotification("Statistik", `Total Pemain: ${data.totalPlayers} | Status: ${data.systemStatus}`);
        }} className="bg-emerald-700 text-white p-8 rounded-3xl shadow-lg hover:bg-emerald-600 transition text-left">
          <h3 className="font-bold text-xl">📊 Cek Statistik</h3>
        </button>
        <button onClick={async () => {
            const res = await fetch('/api/profile', { headers: { 'Authorization': apiKey } });
            const data = await res.json();
            showNotification("Profil", `Username: ${data.username || "Admin"} | Role: ${data.role || "Manager"}`);
        }} className="bg-slate-800 text-white p-8 rounded-3xl shadow-lg hover:bg-slate-700 transition text-left">
          <h3 className="font-bold text-xl">👤 Cek Profil</h3>
        </button>
      </div>

      <section className="max-w-4xl mx-auto space-y-8">
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex gap-4">
          <input className="flex-1 p-4 bg-slate-950 border border-slate-800 rounded-xl outline-none text-white" placeholder="Paste API KEY..." value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
          <button onClick={fetchPlayers} disabled={loading} className="bg-emerald-600 text-white px-8 rounded-xl font-bold hover:bg-emerald-500 transition">{loading ? "..." : "Load"}</button>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
          <h3 className="font-bold text-lg mb-4 text-white">Tambah Pemain</h3>
          <div className="flex gap-4">
            <input className="flex-1 p-4 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none" placeholder="Nama Pemain" value={name} onChange={(e) => setName(e.target.value)} />
            <select className="flex-1 p-4 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none" value={position} onChange={(e) => setPosition(e.target.value)}>
              <option value="">Pilih Posisi</option>
              <option value="Striker">Striker</option><option value="Midfielder">Midfielder</option><option value="Center Back">Center Back</option><option value="Keeper">Keeper</option>
            </select>
            <button onClick={addPlayer} disabled={actionLoading} className="bg-emerald-600 text-white px-8 rounded-xl font-bold hover:bg-emerald-500 transition">{actionLoading ? "..." : "Tambah"}</button>
          </div>
        </div>

        <div className="grid gap-4">
          {players.map(p => (
            <div key={p.id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex justify-between items-center">
              <div>
                <p className="font-bold text-white">{p.name}</p>
                <p className="text-slate-400 text-sm">{p.position}</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setUpdateModal({ show: true, player: p })} className="text-blue-400 font-bold hover:underline">Edit</button>
                <button onClick={() => setDeleteModal({ show: true, playerId: p.id })} className="text-red-400 font-bold hover:underline">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}