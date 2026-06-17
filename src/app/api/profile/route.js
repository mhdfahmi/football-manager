import { NextResponse } from 'next/server';

export async function GET(request) {
  // Dalam skenario nyata, ini mengambil data berdasarkan API Key di Header
  const apiKey = request.headers.get('authorization');
  
  if (!apiKey) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json({
    username: "User1",
    email: "user@example.com",
    role: "Admin",
    apiKey: apiKey
  });
}