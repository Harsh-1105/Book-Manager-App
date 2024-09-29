import {mongoose, Schema} from "mongoose";

const bookSchema = mongoose.Schema(
  {
    book_name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    rentPerDay: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);