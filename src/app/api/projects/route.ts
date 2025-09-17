import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongo";
import { Project } from "@/models/Project";

/**
 * /api/projects (collection)
 * GET: list all projects
 * POST: create a new project (in-memory only for demo)
 */
export async function GET(request: Request) {
  try {
    await connectMongo(process.env.MONGODB_URI || "");
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 20));
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Project.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Project.countDocuments()
    ]);
    return NextResponse.json({ items, page, limit, total });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    await connectMongo(process.env.MONGODB_URI || "");
    const body = await request.json();
    const doc = await Project.create(body);
    return NextResponse.json(doc, { status: 201 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 400 });
  }
}


