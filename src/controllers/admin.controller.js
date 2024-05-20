import Admin from "../models/admin.model.js";
import User from "../models/user.model.js";
import Walker from "../models/petWalker.model.js";
import bycrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";


export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const passwordHash = await bycrypt.hash(password, 10);
    const newAdmin = new Admin({
      username,
      email,
      password: passwordHash,
    });
    const adminSaved = await newAdmin.save();

    const token = await createAccessToken({ id: adminSaved._id });

    res.cookie("token", token);
    res.json({
      id: adminSaved._id,
      username: adminSaved.username,
      email: adminSaved.email,
      createdAt: adminSaved.createdAt,
      updatedAt: adminSaved.updatedAt,
    });
    console.log("Admin creado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminFound = await Admin.findOne({ email });

    if (!adminFound)
      return res.status(400).json({ message: "admin no encontrado" });
    const isMatch = await bycrypt.compare(password, adminFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({ id: adminFound._id });

    res.cookie("token", token);
    res.json({
      id: adminFound._id,
      username: adminFound.username,
      email: adminFound.email,
      createdAt: adminFound.createdAt,
      updatedAt: adminFound.updatedAt,
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
  const adminFound = await Admin.findById(req.user.id)

  if (!adminFound) return res.status(400).json({ message: "admin no encontrado" });
  return res.json({
    id: adminFound._id,
    username: adminFound.username,
    email: adminFound.email,
    createdAt: adminFound.createdAt,
    updatedAT: adminFound.updatedAt,
  })
};


export const getUser = async (req, res) => {
  try {
    const id = await User.findById(req.params.id)
    const userFound = await User.findById(id)
    return res.json({
      userFound
    })
  } catch (error) {
    console.log(error)
  }
}

export const getUsers = async (req, res) => {
  try {
    const userFound = await User.find();
    return res.json({
      userFound
    })
  } catch (error) {
    console.log(error)
  }
}

export const BANuser = async (req, res) => {
  try {
    const id = await User.findById(req.params.id)
    const userFound = await User.findByIdAndUpdate(id,{  estado: false}, {new : true,})
    userFound 
    return res.json({
      userFound
    })
  } catch (error) {
    console.log(error)
  }
}


export const getWalker = async (req, res) => {
  try {
    const id = await Walker.findById(req.params.id)
    const walkerFound = await Walker.findById(id)
    return res.json({
      walkerFound
    })
  } catch (error) {
    console.log(error)
  }
}

export const getWalkers = async (req, res) => {
  try {
    const walkerFound = await Walker.find();
    return res.json({
      walkerFound
    })
  } catch (error) {
    console.log(error)
  }
}

export const BANwalker = async (req, res) => {
  try {
    const id = await Walker.findById(req.params.id)
    const walkerFound = await Walker.findByIdAndUpdate(id,{  estado: false}, {new : true,})
    walkerFound 
    return res.json({
      walkerFound
    })
  } catch (error) {
    console.log(error)
  }
}
