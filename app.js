const express = require('express');
const { createServer } = require('http'); // Crear servidor HTTP
const { Server } = require('socket.io');  // Socket.IO
const path = require('path');
const productsRouter = require('./src/routes/productsRouter');
const cartsRouter = require('./src/routes/cartsRouter');
const exphbs = require('express-handlebars'); // Handlebars

const app = express();
const httpServer = createServer(app); // Servidor HTTP
const io = new Server(httpServer); // Servidor WebSocket

const PORT = 8080;
let products = []; // Almacenamiento temporal en memoria

// Configurar Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
// Ruta corregida para las vistas dentro de `src/views`
app.set('views', path.join(__dirname, 'src', 'views'));

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de API
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Vista Home (Estática)
app.get('/', (req, res) => {
    res.render('home', { products });
});

// Vista Real-Time con Websockets
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products });
});

// Configurar WebSocket
io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Enviar lista actual de productos al conectar
    socket.emit('productList', products);

    // Agregar producto y notificar a todos los clientes
    socket.on('addProduct', (newProduct) => {
        products.push(newProduct);
        io.emit('productList', products); // Emitir la lista actualizada
    });

    // Eliminar producto y notificar a todos los clientes
    socket.on('deleteProduct', (productId) => {
        products = products.filter((p) => p.id !== productId);
        io.emit('productList', products); // Emitir la lista actualizada
    });
});

// Iniciar el servidor HTTP y WebSocket
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
