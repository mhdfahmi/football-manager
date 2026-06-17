// Database sementara (Array)
// Di dunia nyata, ini akan diganti dengan database seperti PostgreSQL atau MongoDB
let players = [
  { id: 1, name: "Lionel Messi", position: "Forward", number: 10 },
  { id: 2, name: "Virgil van Dijk", position: "Defender", number: 4 }
];

// --- 1. GET (Read Data) ---
export async function GET(request) {
  const apiKey = request.headers.get("Authorization");
  if (!apiKey) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json(players);
}

// --- 2. POST (Create Data) ---
export async function POST(request) {
  const apiKey = request.headers.get("Authorization");
  if (!apiKey) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const newPlayer = {
    id: players.length > 0 ? players[players.length - 1].id + 1 : 1,
    name: body.name,
    position: body.position,
    number: body.number
  };

  players.push(newPlayer);
  return Response.json(newPlayer, { status: 201 });
}

// --- 3. PUT (Update Data) ---
export async function PUT(request) {
  const apiKey = request.headers.get("Authorization");
  if (!apiKey) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json(); // Data yang ingin diubah (id, name, dll)
  const index = players.findIndex(p => p.id === body.id);

  if (index === -1) return Response.json({ error: "Pemain tidak ditemukan" }, { status: 404 });

  players[index] = { ...players[index], ...body };
  return Response.json(players[index]);
}

// --- 4. DELETE (Delete Data) ---
export async function DELETE(request) {
  const apiKey = request.headers.get("Authorization");
  if (!apiKey) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json(); // ID pemain yang akan dihapus
  players = players.filter(p => p.id !== id);
  
  return Response.json({ message: "Pemain berhasil dihapus" });
}