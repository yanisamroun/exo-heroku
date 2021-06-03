// Importer express
const express = require('express');
const path = require('path');
const axios = require('axios');

// Initialiser l'application
const app = express();

// Lier mon express.JS à un moteur de template (ici: twig)
// 1. On va récupérer mes templates dans le dossier views
app.set('views', path.join(__dirname,'views'));
// 2. Connecter twig à express.js
app.set('view engine', 'twig');

// Rendre automatiquement disponible en URL tout fichier
// dans le dossier public
app.use(express.static('public'))

// Définir le port dans une variable
const port = 4400;

// Routing
app.get('/', (req, res) => {
    res.render('index', {bachi: "Mange tes morts"});
})

app.get('/blog', (req,res) => {
    // Récupérer la liste des articles
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
    .then(resAxios => {
        res.render('blog', {posts: resAxios.data});
    })
})

app.get('/blog/:id', (req,res) => {
    const id = req.params.id;

    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(resAxios => {
        res.render('article', {post: resAxios.data})
    })
})

// Ex: /utilisateurs/7
app.get('/utilisateurs/:bachi', (req,res) => {

    // Vient récupérer tout ce qu'il y a après /utilisateurs/
    // Et ça va le mettre dans :bachi
    // Et ça, ça le transvide dans req.params.bachi
    // Dans mon ex, id -> 7
   const id = req.params.bachi;

   // Récupérer les données de l'API JSON placeholder
   // POur un utilisateur précis
   // Ici, celui dont l'id correspond à req.params.bachi
   axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
   .then(resAxios => {
       console.log(resAxios.data);

       // Mes données de l'API que je reçois
       // Je les envoie dans le template twig
       // Avec un nom myUser qui permet de faire
       // Dans mon template
       // {{myUser.quelquechose}}
       res.render('user', {myUser: resAxios.data});
   })
})


app.get('/services', (req,res) => {
    res.render('services')
})

app.get('/contact', (req,res) => {
    res.render('contact', {mail: 'jean-baptiste@pop.eu.com'})
})

// Lance le serveur
app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});