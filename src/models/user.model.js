import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  foto_perfil: {
      type: Buffer,
      required: true,
    },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  ciudad: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  estado:{
    type: Boolean,
    default: true
  }
},{
  timestamps: true
});

export default mongoose.model("User", userSchema);
