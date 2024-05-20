import Request from "../models/requests.model.js";

export const getRequests = async (req, res) => {
  try {
    const request = await Request.find({
      user: req.user.id,
    }).populate("user");
    res.json(request);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" } + error);
  }
};

export const createRequest = async (req, res) => {
  try {
    const { inicio, final, descripcion, estado, date, paseador } = req.body;
    console.log(req.Request);
    const newRequest = new Request({
      inicio,
      final,
      descripcion,
      estado,
      date,
      user: req.user.id,
      paseador,
    });
    const savedRequest = await newRequest.save();
    res.json(savedRequest);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" });
  }
};

export const getRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate("user");
    if (!request)
      return res.status(404).json({ message: "Peticion no encontrada" });
    res.json(request);
  } catch (error) {
    return res.status(404).json({ message: "Peticion no encontrada" });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    if (!request)
      return res.status(404).json({ message: "Peticion no encontrada" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Peticion no encontrada" });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!request)
      return res.status(404).json({ message: "Peticion no encontrada" });
    res.json(request);
  } catch (error) {
    return res.status(404).json({ message: "Peticion no encontrada" });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { estado: "aceptado",
       paseador: req.user.id
       },
      {
        new: true,
      }
    );
    if (!request)
      return res.status(404).json({ message: "Peticion no encontrada" });
    res.json(request);
  } catch (error) {
    return res.status(404).json({ message: "Peticion no encontrada" });
  }
};
