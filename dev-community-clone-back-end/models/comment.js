const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    comId: String,
    text: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    parentPost: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

module.exports = mongoose.model("Comment", commentSchema);
