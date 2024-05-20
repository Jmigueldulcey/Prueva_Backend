import User from "../models/user.model.js";
import bycrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";


export const register = async (req, res) => {
  const { email, password, nombre, apellido, ciudad, } = req.body;
  try {
    const passwordHash = await bycrypt.hash(password, 10);
    const newUser = new User({
      nombre,
      apellido,
      ciudad,
      email,
      password: passwordHash,
    });
    if (req.file) {
      newUser.foto_perfil = req.file.path; 
    }
    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      foto_perfil: userSaved.foto_perfil,
      nombre: userSaved.nombre +" "+ userSaved.apellido,
      ciudad: userSaved.ciudad,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password} = req.body;
  try {
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bycrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    if (userFound.estado == false)
      return res.status(400).json({ message: "Usuario Baneado" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      nombre: userFound.nombre +" "+ userFound.apellido,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
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
  const userFound = await User.findById(req.user.id)

    if(!userFound) return res.status(400).json({message: "usuario no encontrado"});
    return res.json({
        id: userFound._id,
        foto_perfil: userFound.foto_perfil,
        nombre: userFound.nombre +" "+ userFound.apellido,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAT: userFound.updatedAt,
    })
};
