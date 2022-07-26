const express = require('express');
const path = require('path');
const port = 3030;

const app = express();

app.use(express.static('public'));

app.get('/', (req,res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/product-cart', (req,res) => res.sendFile(path.join(__dirname, 'views', 'productCart.html')));
app.get('/detalledelproducto', (req,res) => res.sendFile(path.join(__dirname, 'views', 'detalledelproducto.html')));
app.get('/header-footer', (req,res) => res.sendFile(path.join(__dirname, 'views', 'header-footer.html')));
app.get('/login', (req,res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/register', (req,res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));

app.listen(port, () => console.log(`Server running in http://localhost:${port}`));