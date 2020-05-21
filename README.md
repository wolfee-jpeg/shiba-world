# Shiba World

An asset repository for the different species of VRChat.

React front-end using Material UI component library. Google Firebase backend (database and storage) with functions for stuff like sync with search engine Algolia.

## Starting up - front-end

Tested in Ubuntu only.

    cd reactapp
    npm i
    cp .env.example .env
    npm start

## Back-end

### Functions

Functions are just tiny Node.js functions that are called when specific Firestore/Firebase events are triggered (eg. document is updated).

**Note:** To talk to external services (eg. Algolia) you must have a Blaze paid account.

    cd firebase/functions
    npm i
    firebase login
    cp .algoliaconfig.json.example .algoliaconfig.json
    npm run deploy

### Backup

Backups can be manually done.

First generate credentials:

1. Go to Firebase Console
2. Go to project
3. Go to Project Settings / Service Accounts
4. Click Generate New Private Key
5. Paste credentials.json into root of firebase/backup

   cd firebase/backup
   npm i
   npm run backup
