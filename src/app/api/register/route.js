import { NextResponse } from 'next/server';
// Pastikan file db.js Anda sudah benar (menggunakan global object)
import { usersDatabase } from '../db'; 

export async function POST(request) {
  try {
    // 1. Ambil data dengan aman
    const body = await request.json();
    const { username, password } = body;

    // 2. Validasi input
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username & Password wajib diisi!" }, 
        { status: 400 }
      );
    }

    // 3. Cek duplikasi (gunakan .some() untuk performa lebih baik)
    const userExists = usersDatabase.some(u => u.username === username);
    if (userExists) {
      return NextResponse.json(
        { error: "Username sudah terdaftar, silakan pilih yang lain." }, 
        { status: 409 }
      );
    }

    // 4. Generate API Key unik
    const apiKey = "FC-" + Math.random().toString(36).substring(2, 12).toUpperCase();

    // 5. Simpan ke database
    usersDatabase.push({ 
        username, 
        password, 
        apiKey,
        createdAt: new Date().toISOString() 
    });

    console.log(`User baru berhasil didaftarkan: ${username}`);

    // 6. Respon sukses
    return NextResponse.json(
      { 
        message: "Registrasi berhasil!", 
        apiKey: apiKey 
      }, 
      { status: 201 }
    );

  } catch (error) {
    console.error("Registrasi Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." }, 
      { status: 500 }
    );
  }
}