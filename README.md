# Skull Finder
Où est Skullmasher ? Il est où Flo !

https://skullmasher.io/skullfinder

## Pourquoi cette application existe
Parce qu'on me demande souvent **"Tu es ou Flo ?"**. Mais surtout parce que j'ai envie de créer une application !

# Route de développement (Roadmap)
  - ~~Une interface admin qui permet de changer les informations du marqueur~~
  - ~~Créer une base couchDB pour synchroniser l'application et la rendre offline~~
  - ~~Demander au front de se synchroniser à la base avec my man *pouchDB*~~
  - Login area for the admin section based on pouchdb-auth
  - Créer une version android de l'app. Option préféré pour le moment un une PWA comme sur pokedex.org (réalisé par un des contributeur de pouchdb)

# Architecture
**app :** Contient le dossier de l’application/site web des utilisateurs.
**admin :** Site web de l'interface admin.

# Build command
**npm run devapp :** Démarre l'écoute sur les fichiers qui compose la partie site web/application client
**npm run devadmin :** Démarre l'écoute sur les fichiers qui compose la partie site web admin
