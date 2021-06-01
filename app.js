// Importer express
const express = require('express');

// Initialiser l'application
const app = express();

// Définir le port dans une variable
const port = 4400;

// Routing
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/services', (req,res) => {
    res.send('Mes services');
})

// Lance le serveur
app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});