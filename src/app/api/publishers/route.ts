import { connectMongoose } from "@/utils/mongoose-client";
import { PublisherModel } from "@/models/publisher-model";
import type { IPublisherDocument } from "@/models/publisher-model";

export async function GET() {
  try {
    await connectMongoose();
    const publishers = await PublisherModel.find().exec();
    const mapped = publishers.map((p: IPublisherDocument) => ({
      id: p.id,
      name: p.name,
    }));
    return Response.json(mapped);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
