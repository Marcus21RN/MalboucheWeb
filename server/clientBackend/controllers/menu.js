import Menu from "../../models/menu.js";


// Solo obtener menús activos
export const obtenerMenus = async (req, res) => {
  try {
    const menus = await Menu.find({ estado: "activo" }).populate('productos.IDProducto');
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los menús" });
  }
};
