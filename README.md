# SLV
Application mobile/web de l'association SLV

## Installation
Installer [nodejs](https://nodejs.org/en/download/) (TLS) et git.

Dans un terminal:
```
npm install -g @ionic/cli native-run cordova-res
mkdir ProjetSLV
cd ProjetSLV
git clone https://github.com/Sophia-Loisirs-et-Vie/SLV
npm i
npm start
```

## Editeur
Visual Studio Code recommandé

## Premières étapes à faire
* Changer le titre dans la page html, favicon
* Traduire en français
* Renommer les composants, exemple About devient APropos

## Environnement technique
* la partie cliente (mobile/web) est développée avec Ionic React
* la partie serveur (api) avec nodejs qui permet d'accéder à Wordpress (REST/json) et autres services Yunohost hébergés par SLV

## Fonctionnalités proposées
* Organisation de réunions avec invitations des membres
* Inscription adhérent
* Aide pendant la crise: actions, dons, bénévolat

## Liens
[Wordpress REST API](https://developer.wordpress.org/rest-api/)

## Captures d'écran
![web](https://github.com/Sophia-Loisirs-et-Vie/SLV/blob/master/resources/screenshots/ionicreactslv.jpg?raw=true)
![mobile](https://github.com/Sophia-Loisirs-et-Vie/SLV/blob/master/resources/screenshots/ionicreactslvmobile.jpg?raw=true)