import type { NextRequest } from "next/server";
import {
  getSubscriberById,
  updateSubscriber,
  deleteSubscriber,
} from "@/controllers/subscriber-controller";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const subscriber = await getSubscriberById(id);
    if (!subscriber)
      return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json(subscriber);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const result = await updateSubscriber(id, data);
    if (!result) {
      return Response.json({ error: "Subscriber not found" }, { status: 404 });
    }
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

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await deleteSubscriber(id);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
