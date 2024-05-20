import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    imagen: {
      type: Buffer,
      required: true,
    },
    genero: {
      type: String,
      required: true,
    },
    nacimiento: {
      type: Date,
      required: true,
    },
    raza: {
      type: String,
      required: true,
    },
    vacunas: {
      type: String,
      required: true,
    },
    alergias: {
      type: String,
      required: true,
    },
    peso: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Pets", petSchema);
