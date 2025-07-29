import express from 'express';
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
} from '../controllers/producto.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', getProductos);

// Obtener un producto por ID
router.get('/:id', getProductoById);

// Crear un nuevo producto
router.post('/', createProducto);

// Actualizar un producto
router.put('/:id', updateProducto);

// Eliminar un producto
router.delete('/:id', deleteProducto);

export default router;
