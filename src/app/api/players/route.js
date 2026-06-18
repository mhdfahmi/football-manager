import { NextResponse } from 'next/server';
import { playersDatabase } from '../db'; 

// --- 1. GET (Read All) ---
export async function GET(request) {
  const apiKey = request.headers.get("Authorization");
  if (!apiKey) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  return NextResponse.json(playersDatabase);
}

// --- 2. POST (Create) ---
export async function POST(request) {
  const apiKey = request.headers.get("Authorization");
  if (!apiKey) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name, position, number } = await request.json();
    
    if (!name || !position) {
      return NextResponse.json({ error: "Nama dan Posisi wajib diisi!" }, { status: 400 });
    }

    const newPlayer = {
      id: playersDatabase.length > 0 ? (Math.max(...playersDatabase.map(p => p.id)) + 1) : 1,
      name,
      position,
      number: number || 0
    };

    playersDatabase.push(newPlayer);
    return NextResponse.json(newPlayer, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Gagal memproses data" }, { status: 400 });
  }
}

// --- 3. PUT (Update) ---
export async function PUT(request) {
  const apiKey = request.headers.get("Authorization");
  if (!apiKey) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const index = playersDatabase.findIndex(p => p.id === body.id);

    if (index === -1) return NextResponse.json({ error: "Pemain tidak ditemukan" }, { status: 404 });

    playersDatabase[index] = { ...playersDatabase[index], ...body };
    return NextResponse.json(playersDatabase[index]);
  } catch (e) {
    return NextResponse.json({ error: "Gagal update data" }, { status: 400 });
  }
}

// --- 4. DELETE (Delete) ---
export async function DELETE(request) {
  const apiKey = request.headers.get("Authorization");
  if (!apiKey) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await request.json();
    
    // Temukan index
    const index = playersDatabase.findIndex(p => p.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: "Pemain tidak ditemukan" }, { status: 404 });
    }

    // Perbaikan: Gunakan splice untuk menghapus elemen dari array original tanpa memutuskan referensi
    playersDatabase.splice(index, 1);

    return NextResponse.json({ message: "Pemain berhasil dihapus" });
  } catch (e) {
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 400 });
  }
}