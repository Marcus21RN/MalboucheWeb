import mongoose from "mongoose";

const PromocionSchema = new mongoose.Schema({
  _id: String, // Código de la promoción
  nombre: String,
  descripcion: String,
  fechaInicio: Date,
  fechaFin: Date,
  estado: {
    type: String,
    enum: ["activo", "inactivo", "expirada"]
  },
  imagen: {
    type: String,
    default: null
  }
}, { collection: "promocion" });

const Promocion = mongoose.model("Promocion", PromocionSchema);
export default Promocion;