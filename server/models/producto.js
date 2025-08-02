import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema({
  _id: String,
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  estado: { type: String, enum: ["activo", "inactivo"], default: "activo" },
  categoria: { type: String, enum: ["bebidas", "cocteles", "alimentos", "snacks"], required: true },
}, { collection: "producto" });

export default mongoose.model("Producto", ProductoSchema);