// Importation Bibliothèques
var createError = require('http-errors'); // Importation du module http-errors pour gérer les erreurs HTTP
var express = require('express'); // Importation du framework Express pour créer l'application web
var path = require('path'); // Importation du module path pour gérer les chemins de fichiers et de répertoires
var cookieParser = require('cookie-parser'); // Importation du module cookie-parser pour parser les cookies dans les requêtes HTTP
var logger = require('morgan'); // Importation du module morgan pour logger les requêtes HTTP dans la console

const http = require('http'); // Importation du module HTTP pour créer un serveur HTTP

require('dotenv').config(); // Importation du module dotenv pour charger les variables d'environnement depuis le fichier .env

const { connectToMongoDB } = require('./config/mogo.connection'); // Importation de la fonction connectToMongoDB depuis le fichier config/mogo.connection.js
const { seedDefaultUsers } = require('./config/user.seed');
const { seedDefaultCars } = require('./config/car.seed');
// Importation des routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.routes');
var carRouter = require('./routes/car.router');
var productRouter = require('./routes/product.router');

const authLogMiddleware = require('./middlewares/log.middlewares'); // Importation du middleware de logging personnalisé")


// Création de l'application
var app = express();

app.use(logger('dev')); // Middleware pour le logging des requêtes HTTP(200, 404, 500, etc.)
app.use(express.json()); // Middleware pour parser le corps des requêtes en JSON {"key": "value", etc.}
app.use(express.urlencoded({ extended: false })); // Middleware pour parser le corps des requêtes en URL-encoded (key=value&key2=value2, etc.)
app.use(cookieParser()); // Middleware pour parser les cookies
app.use(authLogMiddleware); // Le middleware de log est placé après les parseurs, pour qu'il puisse lire req.body et req.session de façon sûre.
app.use(express.static(path.join(__dirname, 'public'))); // Middleware pour servir les fichiers statiques (images, CSS, JS, etc.) depuis le dossier public

// Définition des routes
app.use('/', indexRouter);
app.use('/users', usersRouter); 
app.use('/cars', carRouter);
app.use('/products', productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // On envoie une réponse JSON au lieu de tenter de rendre une vue qui n'existe pas.
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Erreur interne du serveur',
    error: req.app.get('env') === 'development' ? {
      status: statusCode,
      stack: err.stack
    } : {}
  });
});

const server = http.createServer(app); // Création du serveur HTTP avec l'application Express

server.listen(process.env.port , () => { 
  connectToMongoDB()
    .then(seedDefaultUsers)
    .then(seedDefaultCars)
    .then(() => {
      console.log(`Serveur démarré sur le port ${process.env.port}`);
    })
    .catch(() => {
      process.exitCode = 1;
    });
});