const express = require('express');
const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/productsController');
const router = express.Router();

// Listar todos los productos
router.get('/', getAllProducts);

// Obtener producto por ID
router.get('/:pid', getProductById);

// Agregar nuevo producto
router.post('/', addProduct);

// Actualizar producto por ID
router.put('/:pid', updateProduct);

// Eliminar producto por ID
router.delete('/:pid', deleteProduct);

module.exports = router;
