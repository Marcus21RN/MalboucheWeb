
import Producto from '../../models/producto.js';
import { syncMenusOnProductUpdate, removeProductFromMenus } from './menu.js';

// Obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
};

// Obtener un producto por ID
export const getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto', error });
  }
};

// Crear un nuevo producto
export const createProducto = async (req, res) => {
  try {
    // Normalizar categoría y estado
    let data = {
      ...req.body,
      categoria: req.body.categoria?.toLowerCase(),
      estado: req.body.estado || "activo"
    };
    // Si no se recibe _id, generarlo automáticamente
    if (!data._id || data._id === "") {
      const count = await Producto.countDocuments();
      data._id = `PROD${count + 1}`;
    }
    const nuevoProducto = new Producto(data);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear producto', error });
  }
};

// Actualizar un producto

export const updateProducto = async (req, res) => {
  try {
    // Normalizar categoría y estado
    const data = {
      ...req.body,
      categoria: req.body.categoria?.toLowerCase(),
      estado: req.body.estado || "activo"
    };
    const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!productoActualizado) return res.status(404).json({ message: 'Producto no encontrado' });
    // Si el producto fue desactivado, eliminarlo de todos los menús
    if (productoActualizado.estado === 'inactivo') {
      const { removeProductFromMenus } = await import('./menu.js');
      await removeProductFromMenus(productoActualizado._id);
    }
    // Sincronizar menús (si es necesario)
    await syncMenusOnProductUpdate(productoActualizado);
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar producto', error });
  }
};

// Eliminar un producto

export const deleteProducto = async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) return res.status(404).json({ message: 'Producto no encontrado' });
    // Eliminar el producto de todos los menús
    await removeProductFromMenus(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar producto', error });
  }
};
