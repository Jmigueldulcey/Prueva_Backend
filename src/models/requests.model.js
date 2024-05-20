import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    inicio: {
      type: Date,
      required: true,
    },
    final: {
      type: Date,
      required: true,
    },
    descripcion: {
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
    estado: {
      type: String,
      default: "En espera",
      required: true,
    },
    paseador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paseadores",
      default:null
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Peticiones", requestSchema);
