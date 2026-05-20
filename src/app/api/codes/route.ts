import { connectMongoose } from "@/utils/mongoose-client";
import { CodeModel } from "@/models/code-model";

export async function GET() {
  try {
    await connectMongoose();
    const codes = await CodeModel.find().lean();
    const mapped = (codes as any[]).map((c) => ({
      id: c._id.toString(),
      value: c.value,
    }));
    return Response.json(mapped);
  } catch (error) {
    console.error("API CODES ERROR:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
