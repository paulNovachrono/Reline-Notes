// create the server & config the server

import express from "express";
import dotenv from "dotenv";
import noteModel from "./models/notes.model.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// static file path
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

// api
// create note
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await noteModel.create({ title, description });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

// Read all notes
app.get("/api/notes", async (req, res) => {
  const allNotes = await noteModel.find();

  res.status(200).json({
    message: "Notes fetched Successfully",
    allNotes,
  });
});

// update note
app.patch("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  await noteModel.findOneAndUpdate(
    { _id: id },
    { title, description },
    { new: true, runValidators: true },
  );

  res.status(200).json({
    message: "Note Updated successfully",
  });
});

// Delete note by id
app.delete("/api/notes/:id", async (req, res) => {
  const noteId = req.params.id;

  await noteModel.findByIdAndDelete(noteId);

  res.status(200).json({
    message: "Note Deleted Successfully",
  });
});

// fallback route (must be last)
app.get("*name", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "frontend", "dist", "index.html"),
  );
});

export default app;
