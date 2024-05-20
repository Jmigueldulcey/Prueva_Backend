import Pet from "../models/pets.model.js";


export const getPets = async (req, res) => {
  try {
    const pets = await Pet.find({
      user: req.user.id,
    }).populate("user");
    res.json(pets);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" });
  }
};

export const createPet = async (req, res) => {

  try {
    const { nombre, descripcion, date, genero, nacimiento, raza, vacunas, alergias, peso } = req.body;
    console.log(req.user);
    const newPet = new Pet({
      nombre,
      descripcion,
      genero,
      nacimiento,
      raza,
      vacunas,
      alergias,
      peso,
      date,
      user: req.user.id,
    });
    if (req.file) {
      newPet.imagen = req.file.path; 
    }
    const savedPet = await newPet.save();
    res.json(savedPet);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" }+error);
  }
};

export const getPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("user");
    if (!pet)
      return res.status(404).json({ message: "Mascota no encontrada" });
    res.json(pet);
  } catch (error) {
    return res.status(404).json({ message: "Mascota no encontrada" });
  }
};

export const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet)
      return res.status(404).json({ message: "Mascota no encontrada" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Mascota no encontrada" });
  }
};

export const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pet)
      return res.status(404).json({ message: "Mascota no encontrada" });
    res.json(pet);
  } catch (error) {
    return res.status(404).json({ message: "Mascota no encontrada" });
  }
};
