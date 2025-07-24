import Menu from "../../models/menu.js";
import Producto from "../../models/producto.js";

export const obtenerMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los menús" });
  }
};

export const agregarMenu = async (req, res) => {
  try {
    const { _id, nombre, tipoMenu, estado, productos } = req.body;

    for (const item of productos) {
      const existeProducto = await Producto.findById(item.IDProducto);
      if (!existeProducto) {
        return res.status(400).json({ error: `El producto con ID '${item.IDProducto}' no existe.` });
      }
    }

    const nuevoMenu = new Menu({
      _id,
      nombre,
      tipoMenu,
      estado,
      productos
    });

    await nuevoMenu.save();
    res.status(201).json(nuevoMenu);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el menú" });
  }
};

export const actualizarMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, tipoMenu, estado, productos } = req.body;

    for (const item of productos) {
      const existeProducto = await Producto.findById(item.IDProducto);
      if (!existeProducto) {
        return res.status(400).json({ error: `El producto con ID '${item.IDProducto}' no existe.` });
      }
    }

    const menuActualizado = await Menu.findByIdAndUpdate(
      id,
      { nombre, tipoMenu, estado, productos },
      { new: true }
    );

    res.json(menuActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el menú" });
  }
};

export const eliminarMenu = async (req, res) => {
  try {
    const { id } = req.params;
    await Menu.findByIdAndDelete(id);
    res.json({ mensaje: "Menú eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el menú" });
  }
};