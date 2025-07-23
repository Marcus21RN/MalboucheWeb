import Galeria from "../models/galeria.js";

export const obtenerGaleria = async (req, res) => {
  try {
    const imagenes = await Galeria.find().sort({ uploadedAt: -1 });
    res.json(imagenes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las imágenes" });
  }
};

export const agregarImagen = async (req, res) => {
  try {
    const { _id, imageUrl, title, description } = req.body;
    const nuevaImagen = new Galeria({
      _id,
      imageUrl,
      title,
      description,
      uploadedAt: new Date()
    });
    await nuevaImagen.save();
    res.status(201).json(nuevaImagen);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar la imagen" });
  }
};

export const actualizarImagen = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl, title, description } = req.body;
    const imagenActualizada = await Galeria.findByIdAndUpdate(
      id,
      { imageUrl, title, description },
      { new: true }
    );
    res.json(imagenActualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la imagen" });
  }
};

export const eliminarImagen = async (req, res) => {
  try {
    const { id } = req.params;
    await Galeria.findByIdAndDelete(id);
    res.json({ mensaje: "Imagen eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la imagen" });
  }
};