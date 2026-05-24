import { connectMongoose } from "@/utils/mongoose-client";
import { AuthorModel } from "@/models/author-model";
import type { IAuthorDocument } from "@/models/author-model";

export async function GET() {
  try {
    await connectMongoose();
    const authors = await AuthorModel.find().exec();
    const mapped = authors.map((a: IAuthorDocument) => ({
      id: a.id,
      name: a.name,
    }));
    return Response.json(mapped);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
