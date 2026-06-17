import { NextResponse } from 'next/server';

export async function GET() {
  // Contoh logika: Menghitung total data dari berbagai resource
  const stats = {
    totalPlayers: 15,
    totalInjuries: 3,
    activeClubs: 8,
    systemStatus: "Healthy"
  };
  return NextResponse.json(stats);
}