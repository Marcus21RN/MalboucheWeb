import Producto from "../../models/producto.js";

export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const agregarProducto = async (req, res) => {
  try {
    const { _id, nombre, precio, descripcion, categoria } = req.body;
    const nuevoProducto = new Producto({ _id, nombre, precio, descripcion, categoria });
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto" });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, descripcion, categoria } = req.body;
    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      { nombre, precio, descripcion, categoria },
      { new: true }
    );
    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await Producto.findByIdAndDelete(id);
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};