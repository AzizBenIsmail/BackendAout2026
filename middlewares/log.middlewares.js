  const fs = require("fs");
  const path = require("path"); // On importe le module path pour manipuler les chemins de fichiers et dossiers de manière fiable.

  // Middleware de logging : il enregistre les informations d'une requête HTTP avant de laisser passer la suite.
  function authLogMiddleware(req, res, next) {
    const startTime = new Date(); // On mémorise l'heure de départ pour calculer le temps d'exécution.
    appendLog(req, res, startTime); // On appelle la fonction qui écrit le log.
    next(); // On passe la main au middleware ou contrôleur suivant.
  }

  // Fonction qui construit et enregistre le message de log dans un fichier.
  function appendLog(req, res, startTime) {
    // On transforme les headers HTTP en chaîne JSON pour les inclure dans le log.
    const headers = JSON.stringify(req.headers);

    // On mesure le temps écoulé entre le début et la fin du traitement de la requête.
    const endTime = new Date();
    const executionTime = endTime - startTime;

    // On vérifie si le corps de la requête contient des données ; si absent ou vide, on met 'N/A'.
    const body = req.body && Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : 'N/A';

    // Le referer indique la page ou le site source de la requête. S'il n'existe pas, on met 'N/A'.
    const referer = req.headers.referer || 'N/A';
    const user = req.session && req.session.user ? req.session.user : null;

    // On construit une chaîne de log avec les informations principales : date, méthode, URL, adresse IP, etc.
    const log = `${new Date().toISOString()} - ${req.method} - ${req.originalUrl} - ${req.ip} - Referer: ${referer} - ${res.statusCode} - User_id: ${user ? user._id : 'N/A'} | nom: ${user ? user.name : 'N/A'} | role: ${user ? user.role : 'N/A'} \nHeaders: ${headers}\nExecution Time: ${executionTime} ms\nBody: ${body}\n - ${res.locals && res.locals.data ? res.locals.data : 'N/A'}\n`;

    // Le dossier de logs se trouve à la racine du projet, un niveau au-dessus de ce fichier.
    const logsDirectory = path.join(__dirname, '..', 'logs');
    const logFilePath = path.join(logsDirectory, 'log.log'); // Le fichier principal où les logs sont ajoutés.

    // Si le dossier logs n'existe pas encore, on le crée automatiquement.
    if (!fs.existsSync(logsDirectory)) {
      fs.mkdirSync(logsDirectory);
    }

    try {
      // fs.appendFileSync ajoute le message à la fin du fichier sans écraser les logs précédents.
      fs.appendFileSync(logFilePath, log);
    } catch (err) {
      // En cas d'erreur d'écriture, on affiche un message dans la console pour diagnostiquer le problème.
      console.error("Erreur lors de l'enregistrement dans le fichier journal :", err);
    }
  }

  module.exports = authLogMiddleware;
