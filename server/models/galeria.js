import mongoose from "mongoose";

const galeriaSchema = new mongoose.Schema({
  _id: { type: Number, required: true }, // Número entero único para identificar la imagen
  imageUrl: { type: String, required: true }, // URL de la imagen
  title: { type: String }, // Título de la imagen
  description: { type: String }, // Descripción de la imagen
  uploadedAt: { type: Date, required: true } // Fecha de subida
}, { collection: "imagenes" });

const Galeria = mongoose.models.Galeria || mongoose.model("imagenes", galeriaSchema);
export default Galeria;