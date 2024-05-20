import Walker from "../models/petWalker.model.js";
import bycrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { email, password, nombre, apellido, ciudad, services } = req.body;
  try {
    const passwordHash = await bycrypt.hash(password, 10);
    const newPetWalker = new Walker({
      nombre,
      apellido,
      ciudad,
      email,
      services,
      password: passwordHash,
    });
    if (req.file) {
      newPetWalker.foto_perfil = req.file.path;
    }
    const walkerSaved = await newPetWalker.save();

    const token = await createAccessToken({ id: walkerSaved._id });

    res.cookie("token", token);
    res.json({
      id: walkerSaved._id,
      foto_perfil: walkerSaved.foto_perfil,
      username: walkerSaved.nombre + " " + walkerSaved.apellido,
      ciudad: walkerSaved.ciudad,
      email: walkerSaved.email,
      services: walkerSaved.services,
      createdAt: walkerSaved.createdAt,
      updatedAt: walkerSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const walkerFound = await Walker.findOne({ email });

    if (!walkerFound)
      return res.status(400).json({ message: "Paseador no encontrado" });

    const isMatch = await bycrypt.compare(password, walkerFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    if (walkerFound.estado == false)
      return res.status(400).json({ message: "Paseador Baneado" });

    const token = await createAccessToken({ id: walkerFound._id });

    res.cookie("token", token);
    res.json({
      id: walkerFound._id,
      username: walkerFound.nombre + " " + walkerFound.apellido,
      ciudad: walkerFound.ciudad,
      email: walkerFound.email,
      services: walkerFound.services,
      createdAt: walkerFound.createdAt,
      updatedAt: walkerFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const walkerFound = await Walker.findById(req.user.id);

  if (!walkerFound)
    return res.status(400).json({ message: "Paseador no encontrado" });
  return res.json({
    id: walkerFound._id,
    foto_perfil: walkerFound.foto_perfil,
    services: walkerFound.services,
    username: walkerFound.nombre + " " + walkerFound.apellido,
    ciudad: walkerFound.ciudad,
    services: walkerFound.services,
    email: walkerFound.email,
    createdAt: walkerFound.createdAt,
    updatedAT: walkerFound.updatedAt,
  });
};
