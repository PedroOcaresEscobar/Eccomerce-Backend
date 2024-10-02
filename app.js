const express = require('express');
const productsRouter = require('./src/routes/productsRouter');
const cartsRouter = require('./src/routes/cartsRouter');

const app = express();
const PORT = 8080;

// Middleware para parsear JSON
app.use(express.json());

// Configuración de rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
