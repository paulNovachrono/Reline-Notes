import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const noteModel = mongoose.model("notes", notesSchema);

export default noteModel;
