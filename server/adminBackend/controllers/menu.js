import Menu from '../../models/menu.js';
import Producto from '../../models/producto.js';

// Obtener todos los menús con detalles de productos
export const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find().lean();
    // Popular productos manualmente
    for (const menu of menus) {
      menu.productos = (await Promise.all(
        menu.productos.map(async (p) => {
          const prod = await Producto.findById(p.IDProducto).lean();
          return prod ? { ...p, ...prod } : null;
        })
      )).filter(Boolean);
    }
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener menús', error });
  }
};

// Obtener un menú por ID
export const getMenuById = async (req, res) => {
  const start = Date.now();
  console.log(`[getMenuById] Inicio: ${new Date().toISOString()} - id=${req.params.id}`);
  try {
    const menu = await Menu.findById(req.params.id).lean();
    if (!menu) {
      const duration = Date.now() - start;
      console.log(`[getMenuById] No encontrado: ${new Date().toISOString()} - Duración: ${duration}ms`);
      return res.status(404).json({ message: 'Menú no encontrado' });
    }
    menu.productos = (await Promise.all(
      menu.productos.map(async (p) => {
        const prod = await Producto.findById(p.IDProducto).lean();
        return prod ? { ...p, ...prod } : null;
      })
    )).filter(Boolean);
    res.json(menu);
    const duration = Date.now() - start;
    console.log(`[getMenuById] Fin: ${new Date().toISOString()} - Duración: ${duration}ms`);
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`[getMenuById] Error: ${new Date().toISOString()} - Duración: ${duration}ms`, error);
    res.status(500).json({ message: 'Error al obtener menú', error });
  }
};

// Crear un nuevo menú
export const createMenu = async (req, res) => {
  const start = Date.now();
  console.log(`[createMenu] Inicio: ${new Date().toISOString()}`);
  try {
    // Validar que todos los productos existan
    const productosIds = req.body.productos.map(p => p.IDProducto);
    const productosExist = await Producto.find({ _id: { $in: productosIds } });
    if (productosExist.length !== productosIds.length) {
      const duration = Date.now() - start;
      console.log(`[createMenu] Abortado - producto inexistente: ${new Date().toISOString()} - Duración: ${duration}ms`);
      return res.status(400).json({ message: 'Uno o más productos no existen' });
    }
    // Generar el _id automáticamente como MENU{count+1}
    const count = await Menu.countDocuments();
    const nextId = `MENU${count + 1}`;
    const menuData = { ...req.body, _id: nextId };
    const nuevoMenu = new Menu(menuData);
    await nuevoMenu.save();
    res.status(201).json(nuevoMenu);
    const duration = Date.now() - start;
    console.log(`[createMenu] Fin: ${new Date().toISOString()} - Duración: ${duration}ms - id=${nuevoMenu._id}`);
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`[createMenu] Error: ${new Date().toISOString()} - Duración: ${duration}ms`, error);
    res.status(400).json({ message: 'Error al crear menú', error });
  }
};

// Actualizar un menú
export const updateMenu = async (req, res) => {
  const start = Date.now();
  console.log(`[updateMenu] Inicio: ${new Date().toISOString()} - id=${req.params.id}`);
  try {
    // Validar productos
    console.log('Productos recibidos en updateMenu:', req.body.productos);
    if (!Array.isArray(req.body.productos) || req.body.productos.some(p => !p || !p.IDProducto)) {
      const duration = Date.now() - start;
      console.log(`[updateMenu] Abortado - array inválido: ${new Date().toISOString()} - Duración: ${duration}ms`);
      return res.status(400).json({ message: 'El array de productos contiene valores nulos o sin IDProducto' });
    }
    const productosIds = req.body.productos.map(p => p.IDProducto);
    const productosExist = await Producto.find({ _id: { $in: productosIds } });
    console.log('Productos encontrados en BD:', productosExist.map(p => p._id));
    if (productosExist.length !== productosIds.length) {
      const duration = Date.now() - start;
      console.log(`[updateMenu] Abortado - producto inexistente: ${new Date().toISOString()} - Duración: ${duration}ms`);
      return res.status(400).json({ message: 'Uno o más productos no existen', productosIds, productosExist: productosExist.map(p => p._id) });
    }
    let menuActualizado = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menuActualizado) {
      const duration = Date.now() - start;
      console.log(`[updateMenu] No encontrado: ${new Date().toISOString()} - Duración: ${duration}ms`);
      return res.status(404).json({ message: 'Menú no encontrado' });
    }
    // Popular productos y filtrar nulos antes de responder
    menuActualizado = menuActualizado.toObject();
    menuActualizado.productos = (await Promise.all(
      menuActualizado.productos.map(async (p) => {
        if (!p || !p.IDProducto) return null;
        const prod = await Producto.findById(p.IDProducto).lean();
        return prod ? { ...p, ...prod } : null;
      })
    )).filter(Boolean);
    res.json(menuActualizado);
    const duration = Date.now() - start;
    console.log(`[updateMenu] Fin: ${new Date().toISOString()} - Duración: ${duration}ms - id=${req.params.id}`);
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`[updateMenu] Error: ${new Date().toISOString()} - Duración: ${duration}ms`, error);
    res.status(400).json({ message: 'Error al actualizar menú', error });
  }
};

// Eliminar un menú
export const deleteMenu = async (req, res) => {
  const start = Date.now();
  console.log(`[deleteMenu] Inicio: ${new Date().toISOString()} - id=${req.params.id}`);
  try {
    const menuEliminado = await Menu.findByIdAndDelete(req.params.id);
    if (!menuEliminado) {
      const duration = Date.now() - start;
      console.log(`[deleteMenu] No encontrado: ${new Date().toISOString()} - Duración: ${duration}ms`);
      return res.status(404).json({ message: 'Menú no encontrado' });
    }
    res.json({ message: 'Menú eliminado' });
    const duration = Date.now() - start;
    console.log(`[deleteMenu] Fin: ${new Date().toISOString()} - Duración: ${duration}ms - id=${req.params.id}`);
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`[deleteMenu] Error: ${new Date().toISOString()} - Duración: ${duration}ms`, error);
    res.status(400).json({ message: 'Error al eliminar menú', error });
  }
};

// --- Sincronización de productos en menús ---
// Cuando un producto se actualiza, reflejar cambios en los menús
export const syncMenusOnProductUpdate = async (producto) => {
  const start = Date.now();
  console.log(`[syncMenusOnProductUpdate] Inicio: ${new Date().toISOString()} - productoId=${producto?._id}`);
  try {
    // No es necesario modificar los menús, ya que los datos de producto se obtienen en tiempo real
    // Si se almacena información redundante, aquí se actualizaría
    const duration = Date.now() - start;
    console.log(`[syncMenusOnProductUpdate] Fin: ${new Date().toISOString()} - Duración: ${duration}ms`);
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`[syncMenusOnProductUpdate] Error: ${new Date().toISOString()} - Duración: ${duration}ms`, error);
  }
};

// Cuando un producto se elimina, eliminarlo de todos los menús
export const removeProductFromMenus = async (productoId) => {
  const start = Date.now();
  console.log(`[removeProductFromMenus] Inicio: ${new Date().toISOString()} - productoId=${productoId}`);
  try {
    await Menu.updateMany(
      { 'productos.IDProducto': productoId },
      { $pull: { productos: { IDProducto: productoId } } }
    );
    const duration = Date.now() - start;
    console.log(`[removeProductFromMenus] Fin: ${new Date().toISOString()} - Duración: ${duration}ms - productoId=${productoId}`);
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`[removeProductFromMenus] Error: ${new Date().toISOString()} - Duración: ${duration}ms`, error);
  }
};
