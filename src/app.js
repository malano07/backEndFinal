const express = require('express');
const productsRouter = require('./routers/productsRouter');
const cartsRouter = require('./routers/cartsRouter');
const connectDB = require('./config/db');
const path = require('path');
const exphbs = require('express-handlebars'); // Importar express-handlebars

const app = express();
const PORT = 8080;

connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



// Configuración de Handlebars
app.engine(
  'handlebars',
  exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    extname: '.handlebars',
  })
);

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Asegúrate de usar path.join

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
