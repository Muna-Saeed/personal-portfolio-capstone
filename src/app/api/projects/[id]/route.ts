import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongo";
import { Project } from "@/models/Project";

/**
 * /api/projects/[id] (item)
 * GET: read one
 * PUT: update
 * DELETE: remove
 */
export async function GET(_request: Request, context: { params: { id: string } }) {
  await connectMongo(process.env.MONGODB_URI || "");
  const { id } = context.params;
  const doc = await Project.findById(id).lean();
  if (!doc) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json(doc);
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  await connectMongo(process.env.MONGODB_URI || "");
  const { id } = context.params;
  try {
    const body = await request.json();
    const doc = await Project.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!doc) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    return NextResponse.json(doc);
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: { params: { id: string } }) {
  await connectMongo(process.env.MONGODB_URI || "");
  const { id } = context.params;
  const doc = await Project.findByIdAndDelete(id);
  if (!doc) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}


