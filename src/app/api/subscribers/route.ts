import type { NextRequest } from "next/server";
import {
  getAllSubscribers,
  createSubscriber,
} from "@/controllers/subscriber-controller";

export async function GET() {
  try {
    const subscribers = await getAllSubscribers();
    return Response.json(subscribers);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await createSubscriber(body);
    if ("error" in result) {
      return Response.json({ error: result.error }, { status: 400 });
    }
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
