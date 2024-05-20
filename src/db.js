import mongoose from "mongoose";

export const conexionDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/Pawpaseo-DB");
    console.log(">>> DB conectada");
  } catch (error) {
    console.log(error);
  }
};
