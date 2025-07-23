import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema({
  _id: String,
  nombre: String,
  precio: Number,
  descripcion: String,
  categoria: String
}, { collection: "producto" });

export default mongoose.model("Producto", ProductoSchema);