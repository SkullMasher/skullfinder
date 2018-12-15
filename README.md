# Skull Finder
Où est Skullmasher ? Il est où Flo !

https://skullmasher.io/skullfinder

## Pourquoi cette application existe
Parce qu'on me demande souvent **"Tu es ou Flo ?"**. Mais surtout parce que j'ai envie de créer une application !

# Route de développement (Roadmap)
  - ~~Une interface admin qui permet de changer les informations du marqueur~~
  - Créer une base couchDB pour synchroniser l'application
  - Refactorer l'appli pour utiliser l'environement NodeJS
  - demander au front de se synchroniser à la base avec my man *pouchDB*
  - Installer Cordova dans le dossier app pour avoir une appli Android et un site web avec le même code je crois que c'est possible info pas sûr.

# Architecture
**config :** Store a config file with the password to access the backend.
**app :** Contient le dossier de l’application/site web des utilisateurs.
**admin :** Site web de l'interface admin.
**server :** Server that handle the request & the routes.
** ??? :** Un truc node/Express du cul pour faire des routes et autres probablement.

# Comment sa marche
**npm start :** Démarre les routes pour le site web et autres probablement...
**npm run devapp :** Démarre l'écoute sur les fichiers qui compose la partie site web/application client
**npm run devadmin :** Démarre l'écoute sur les fichiers qui compose la partie site web admin
