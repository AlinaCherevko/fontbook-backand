import { Schema, model } from "mongoose";

const contactsSchema = new Schema(
  {
    name: {
      type: String,
    },
    number: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);
export const Contact = model("contact", contactsSchema);
