import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  console.log("[DATA]", data);

  return NextResponse.json({ message: "successfully Greated Account" });
}
