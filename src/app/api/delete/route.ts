import { NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/app/lib/r2/s3";

export async function POST(req: Request) {
  try {
    const { key } = await req.json();

    console.log("Received key for deletion:", key);

    if (!key) {
      return NextResponse.json({ error: "Missing file key" }, { status: 400 });
    }

    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_R2_BUCKET_NAME,
        Key: key,
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
