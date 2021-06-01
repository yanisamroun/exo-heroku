// Importer express
const express = require('express');
const path = require('path');

// Initialiser l'application
const app = express();

// Lier mon express.JS à un moteur de template (ici: twig)
// 1. On va récupérer mes templates dans le dossier views
app.set('views', path.join(__dirname,'views'));
// 2. Connecter twig à express.js
app.set('view engine', 'twig');

// Définir le port dans une variable
const port = 4400;

// Routing
app.get('/', (req, res) => {
    res.render('index', {bachi: "Mange tes morts"});
})

app.get('/blog', (req,res) => {
    res.send('Mes articles');
})

app.get('/blog/:id', (req,res) => {
    res.send(req.params.id)
})

app.get('/contact', (req,res) => {
    res.render('contact', {mail: 'jean-baptiste@pop.eu.com'})
})

// Lance le serveur
app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});