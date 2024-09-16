// ajouter (importer) le module Express
const express = require('express');

// créer une application
const app = express();

// Définition du répertoire public contenant les ressources externes (img, CSS, JS,...)
const path = require('path');
app.use(express.static(path.join(__dirname,'public')));

// Routes vers les différentes pages

app.get('/',function(requete,reponse){
    reponse.render('accueil.ejs', {nomPage: 'Accueil'});
});

app.get('/geo',function(requete,reponse){
    reponse.render('geographie.ejs', {nomPage: 'Géographie'});
});

app.get('/hist',function(requete,reponse){
    reponse.render('histoire.ejs', {nomPage: 'Histoire'});
});

app.get('/cult',function(requete,reponse){
    reponse.render('culture.ejs', {nomPage: 'Culture'});
});

app.get('/gal',function(requete,reponse){
    reponse.render('galerie.ejs', {nomPage: 'Galerie'});
});

app.get('/form',function(requete,reponse){
    reponse.render('contact.ejs', {nomPage: 'Contact'});
});

app.get('/link',function(requete,reponse){
    reponse.render('liens.ejs', {nomPage: 'Liens'});
});

// Ajouter un middleware body-parser qui analyse les données envoyées par la requête POST (lors de l'envoi du formulaire)
const urlEncodedParser = express.urlencoded({ extended:false });

// Ajouter une route pour envoyer les données du formulaire vers la page de traitement
app.post('/traitement', urlEncodedParser, function(req,res,next){
    // récupération des données du formulaire
    let lenom = req.body.nom;
    let leprenom = req.body.prenom;
    let laville = req.body.ville;
    let lemail = req.body.email;
    let lemessage = req.body.message;

    res.render('merci.ejs',{nomPage:'Merci pour le message',nom:lenom,prenom:leprenom,ville:laville,email:lemail,msg:lemessage});
});


// définir une "page" gérant l'erreur 404
app.use(function(requete,reponse,next){
    reponse.status(404).render('page-404.ejs', {nomPage: 'Erreur 404'});
});

app.listen(8080);       // le serveur web écoute sur le port 8080
console.log("Express est démarré et attend vos requêtes...");
