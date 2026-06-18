import { NextResponse } from 'next/server';
import { playersDatabase } from '../db'; // Import data dinamis

export async function GET() {
  try {
    // Menghitung jumlah secara dinamis dari array database
    const stats = {
      totalPlayers: playersDatabase.length, 
      systemStatus: playersDatabase.length > 0 ? "Healthy" : "Empty",
      lastUpdated: new Date().toISOString()
    };
    
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: "Gagal memuat statistik" }, { status: 500 });
  }
}