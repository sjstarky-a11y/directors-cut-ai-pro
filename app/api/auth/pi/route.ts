import { NextResponse } from "next/server";

export const runtime = "nodejs";

type PiUserResponse = {
  uid?: string;
  username?: string;
  credentials?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const accessToken = body?.accessToken;

    if (typeof accessToken !== "string" || !accessToken.trim()) {
      return NextResponse.json(
        { error: "Missing Pi access token." },
        { status: 400 }
      );
    }

    const piResponse = await fetch("https://api.minepi.com/v2/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const responseText = await piResponse.text();

    let responseData: PiUserResponse | { error?: unknown } | null = null;

    try {
      responseData = responseText
        ? (JSON.parse(responseText) as PiUserResponse)
        : null;
    } catch {
      return NextResponse.json(
        { error: "Pi API returned an invalid response." },
        { status: 502 }
      );
    }

    if (!piResponse.ok) {
      return NextResponse.json(
        {
          error: "Pi token verification failed.",
          details: responseData,
        },
        { status: piResponse.status }
      );
    }

    const uid =
      responseData && "uid" in responseData
        ? responseData.uid
        : undefined;

    const username =
      responseData && "username" in responseData
        ? responseData.username
        : undefined;

    if (
      typeof uid !== "string" ||
      !uid.trim() ||
      typeof username !== "string" ||
      !username.trim()
    ) {
      return NextResponse.json(
        { error: "Pi API did not return a valid user." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        user: {
          uid,
          username,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Pi authentication route error:", error);

    return NextResponse.json(
      { error: "Unable to verify Pi authentication." },
      { status: 500 }
    );
  }
}