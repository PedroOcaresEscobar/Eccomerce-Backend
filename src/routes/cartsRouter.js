const express = require('express');
const { createCart, getCartById, addProductToCart } = require('../controllers/cartsController');
const router = express.Router();

// Crear un nuevo carrito
router.post('/', createCart);

// Listar productos de un carrito por ID
router.get('/:cid', getCartById);

// Agregar producto a un carrito
router.post('/:cid/product/:pid', addProductToCart);

module.exports = router;
