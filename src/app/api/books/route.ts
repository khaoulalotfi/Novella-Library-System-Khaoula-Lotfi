import { connectMongoose } from "@/utils/mongoose-client";
import { BookModel } from "@/models/book-model";

export async function GET() {
  try {
    await connectMongoose();
    const books = await BookModel.find().lean();
    const mapped = books.map((b: any) => ({
      id: b._id.toString(),
      inventoryNumber: b.inventoryNumber,
      code: b.code,
      authors: b.authors,
      title: b.title,
      price: b.price,
      publisher: b.publisher,
      year: b.year,
      annotation: b.annotation,
    }));
    return Response.json(mapped);
  } catch (error) {
    console.error("API BOOKS ERROR:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
