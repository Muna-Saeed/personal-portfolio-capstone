import mongoose from "mongoose";

/**
 * Create or reuse a cached Mongoose connection.
 * Usage: await connectMongo(process.env.MONGODB_URI!)
 */
export async function connectMongo(uri: string) {
  if (!uri) throw new Error("MONGODB_URI is required");
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (mongoose.connection.readyState === 2) return mongoose.connection; // connecting
  await mongoose.connect(uri);
  return mongoose.connection;
}


