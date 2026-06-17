// src/app/api/injuries/route.js
import { NextResponse } from 'next/server';

// Database sementara
let injuries = [
  { id: 1, player_name: "Budi", injury: "Hamstring", recovery_time: "2 minggu" }
];

export async function GET(request) {
  return NextResponse.json(injuries);
}

export async function POST(request) {
  const body = await request.json();
  const newInjury = { id: Date.now(), ...body };
  injuries.push(newInjury);
  return NextResponse.json(newInjury, { status: 201 });
}