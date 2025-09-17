import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/**
 * Project schema for portfolio items.
 * - title: required, trimmed, indexed for quick lookup
 * - description: required, trimmed
 * - techStack: required array of non-empty strings
 * - repoUrl/liveUrl/image: optional strings, trimmed
 * - timestamps: createdAt/updatedAt added automatically
 */
const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200,
      index: true
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 4000
    },
    techStack: {
      type: [String],
      required: true,
      validate: {
        validator: (arr: unknown) => Array.isArray(arr) && arr.length > 0 && arr.every((v) => typeof v === "string" && v.trim().length > 0),
        message: "techStack must be a non-empty array of strings"
      }
    },
    repoUrl: { type: String, trim: true, default: undefined },
    liveUrl: { type: String, trim: true, default: undefined },
    image: { type: String, trim: true, default: undefined }
  },
  { timestamps: true }
);

// Ensure consistent JSON output (e.g., remove __v)
ProjectSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    // Keep _id for Mongo semantics; consumer can map to id if desired
    return ret;
  }
});

export type ProjectDocument = InferSchemaType<typeof ProjectSchema> & { _id: mongoose.Types.ObjectId };

// Reuse existing model in dev/hot-reload environments
export const Project: Model<ProjectDocument> =
  (mongoose.models.Project as Model<ProjectDocument>) || mongoose.model<ProjectDocument>("Project", ProjectSchema);


