import { connectMongoose } from "@/utils/mongoose-client";
import { PublisherModel } from "@/models/publisher-model";

export async function GET() {
  try {
    await connectMongoose();
    const publishers = await PublisherModel.find().lean();
    const mapped = (publishers as any[]).map((p) => ({
      id: p._id.toString(),
      name: p.name,
    }));
    return Response.json(mapped);
  } catch (error) {
    console.error("API PUBLISHERS ERROR:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
