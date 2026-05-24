import { connectMongoose } from "@/utils/mongoose-client";
import { CodeModel } from "@/models/code-model";
import type { ICodeDocument } from "@/models/code-model";

export async function GET() {
  try {
    await connectMongoose();
    const codes = await CodeModel.find().exec();
    const mapped = codes.map((c: ICodeDocument) => ({
      id: c.id,
      value: c.value,
    }));
    return Response.json(mapped);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
