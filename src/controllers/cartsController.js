const fs = require('fs');
const path = require('path');
const cartsFile = path.join(__dirname, '../db/carts.json');
const productsFile = path.join(__dirname, '../db/products.json');

// Crear nuevo carrito
const createCart = (req, res) => {
    const carts = JSON.parse(fs.readFileSync(cartsFile, 'utf-8'));
    const newCart = { id: carts.length ? carts[carts.length - 1].id + 1 : 1, products: [] };
    carts.push(newCart);
    fs.writeFileSync(cartsFile, JSON.stringify(carts));
    res.status(201).json(newCart);
};

// Obtener productos por carrito ID
const getCartById = (req, res) => {
    const carts = JSON.parse(fs.readFileSync(cartsFile, 'utf-8'));
    const cart = carts.find(c => c.id === req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart.products);
};

// Agregar producto a un carrito
const addProductToCart = (req, res) => {
    const carts = JSON.parse(fs.readFileSync(cartsFile, 'utf-8'));
    const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
    const cart = carts.find(c => c.id === req.params.cid);
    const product = products.find(p => p.id === req.params.pid);

    if (!cart || !product) return res.status(404).json({ error: 'Carrito o producto no encontrado' });

    const productInCart = cart.products.find(p => p.product === product.id);
    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.products.push({ product: product.id, quantity: 1 });
    }

    fs.writeFileSync(cartsFile, JSON.stringify(carts));
    res.json(cart);
};

module.exports = { createCart, getCartById, addProductToCart };
