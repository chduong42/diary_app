# Journal Intime - Application Mobile 📱

Cette application est un journal intime numérique développé avec [Expo](https://expo.dev) qui permet aux utilisateurs de noter leurs humeurs et pensées quotidiennes.

## Fonctionnalités principales

- 📝 Création d'entrées quotidiennes dans le journal
- 😊 Suivi de votre humeur globale avec tableau de bord
- 📅 Vue calendrier pour visualiser l'historique
- 🔒 Authentification sécurisée des utilisateurs avec Google et Github
- 💾 Stockage des données avec le Cloud Firebase (Firestore)

## Installation et démarrage

1. Installer les dépendances

   ```bash
   npm install
   ```

2. Configuration Firebase
   
   a. Copiez le fichier `.env.example` en `.env` et remplissez les variables avec vos informations Firebase.
   
   b. Dans votre projet Firebase, téléchargez les fichiers de configuration suivants :
   - Pour iOS : `GoogleService-Info.plist`
   - Pour Android : `google-services.json`
   - Pour web : `firebaseConfig.ts`

3. Lancer l'application

   ```bash
   npx expo start
   ```

   Vous pourrez ouvrir l'application sur :
   - Un [émulateur Android](https://docs.expo.dev/workflow/android-studio-emulator/)
   - Un [simulateur iOS](https://docs.expo.dev/workflow/ios-simulator/)
   - [Expo Go](https://expo.dev/go) sur votre appareil mobile

## Technologies utilisées

- [Expo](https://expo.dev) - Framework de développement
- [React Native](https://reactnative.dev) - Framework mobile
- [Firebase](https://firebase.google.com) - Backend et authentification
- [TypeScript](https://www.typescriptlang.org) - Langage de programmation

## Développement

L'application utilise le [routing basé sur les fichiers](https://docs.expo.dev/router/introduction) d'Expo. Pour commencer à développer, modifiez les fichiers dans le dossier **app**.

## Ressources utiles

- [Documentation Expo](https://docs.expo.dev/)
- [Documentation Firebase](https://firebase.google.com/docs)
- [Documentation React Native](https://reactnative.dev/docs/getting-started)
