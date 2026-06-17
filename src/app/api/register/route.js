import { NextResponse } from 'next/server';

// "Database" sementara di memori server
// Di proyek nyata, Anda akan menggunakan database seperti MongoDB/PostgreSQL
const usersDatabase = [];

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // 1. Validasi Input
    if (!username || !password) {
      return NextResponse.json({ error: "Username & Password wajib diisi!" }, { status: 400 });
    }

    // 2. Cek apakah username sudah ada
    const userExists = usersDatabase.find(u => u.username === username);
    if (userExists) {
      return NextResponse.json({ error: "Username sudah terdaftar!" }, { status: 409 });
    }

    // 3. Generate API Key unik
    const apiKey = "FC-" + Math.random().toString(36).substring(2, 12).toUpperCase();

    // 4. Simpan ke "database"
    usersDatabase.push({ username, password, apiKey });

    console.log("Database User:", usersDatabase);

    return NextResponse.json({ 
      message: "Registrasi berhasil!", 
      apiKey: apiKey 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}