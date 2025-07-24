import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  _id: String,
  nombre: String,
  tipoMenu: String,
  estado: {
    type: String,
    enum: ["activo", "inactivo"]
  },
  productos: [
    {
      IDProducto: {
        type: String, ref: "Producto",
        required: true
      }
    }
  ]
}, { collection: "menus" });

export default mongoose.model("Menu", MenuSchema);