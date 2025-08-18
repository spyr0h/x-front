import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { value } = await request.json();

    if (!value || typeof value !== "string") {
      return NextResponse.json(
        { error: "Search value is required" },
        { status: 400 }
      );
    }

    // Appel côté serveur à votre API
    const response = await fetch("https://x-api.ovh/api/full/autocomplete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PUBLIC_API_KEY}`,
      },
      body: JSON.stringify({ value }),
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Autocomplete API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch autocomplete results" },
      { status: 500 }
    );
  }
}
