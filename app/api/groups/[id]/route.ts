import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  return NextResponse.json({ message: `Searching group ${id}` });
}