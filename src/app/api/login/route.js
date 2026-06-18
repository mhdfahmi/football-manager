import { NextResponse } from 'next/server';
import { usersDatabase } from '../db';

export async function POST(request) {
  try {
    // 1. Parsing JSON dengan pengecekan error
    const body = await request.json().catch(() => ({}));
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password wajib diisi!" }, 
        { status: 400 }
      );
    }

    // 2. Mencari user
    const user = usersDatabase.find(u => u.username === username && u.password === password);

    // 3. Validasi kredensial
    if (!user) {
      console.warn(`Gagal login untuk user: ${username}`);
      return NextResponse.json(
        { error: "Username atau password salah!" }, 
        { status: 401 }
      );
    }

    // 4. Sukses
    console.log(`User berhasil login: ${username}`);
    return NextResponse.json(
      { 
        message: "Login sukses!", 
        apiKey: user.apiKey 
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("Login Server Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." }, 
      { status: 500 }
    );
  }
}