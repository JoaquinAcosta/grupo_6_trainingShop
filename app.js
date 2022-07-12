const express = require('express');
const path = require('path');
const port = 3030;

const app = express();

app.use(express.static('public'));

app.get('/', (req,res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));

app.listen(port, () => console.log(`Server running in http://localhost:${port}`));