import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema({
  _id: String,
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  categoria: { type: String, required: true },
}, { collection: "producto" });

export default mongoose.model("Producto", ProductoSchema);