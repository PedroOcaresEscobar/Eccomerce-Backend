const fs = require('fs');
const path = require('path');
const productsFile = path.join(__dirname, '../db/products.json');

// Obtener todos los productos
const getAllProducts = (req, res) => {
    const limit = req.query.limit;
    const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
    if (limit) {
        return res.json(products.slice(0, limit));
    }
    res.json(products);
};

// Obtener producto por ID
const getProductById = (req, res) => {
    const productId = parseInt(req.params.pid); // Convertir a número
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).send({ error: "Producto no encontrado" });
    }

    res.send(product);
};

// Agregar nuevo producto
const addProduct = (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        ...req.body,
        status: req.body.status !== undefined ? req.body.status : true
    };
    products.push(newProduct);
    fs.writeFileSync(productsFile, JSON.stringify(products));
    res.status(201).json(newProduct);
};

// Actualizar producto
const updateProduct = (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
    const index = products.findIndex(p => p.id === req.params.pid);
    if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });
    products[index] = { ...products[index], ...req.body };
    fs.writeFileSync(productsFile, JSON.stringify(products));
    res.json(products[index]);
};

// Eliminar producto
const deleteProduct = (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
    const filteredProducts = products.filter(p => p.id !== req.params.pid);
    fs.writeFileSync(productsFile, JSON.stringify(filteredProducts));
    res.status(204).send();
};

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };
