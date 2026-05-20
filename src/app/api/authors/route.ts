import { connectMongoose } from "@/utils/mongoose-client";
import { AuthorModel } from "@/models/author-model";

export async function GET() {
  try {
    await connectMongoose();
    const authors = await AuthorModel.find().lean();
    const mapped = (authors as any[]).map((a) => ({
      id: a._id.toString(),
      name: a.name,
    }));
    return Response.json(mapped);
  } catch (error) {
    console.error("API AUTHORS ERROR:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
