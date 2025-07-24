import Menu from "../../models/menu.js";


export const obtenerMenus = async (req, res) => {
  try {
    const menus = await Menu.find().populate('productos.IDProducto');
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los menús" });
  }
};


