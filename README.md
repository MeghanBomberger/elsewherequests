# Elsewhere Quests Generator

This project will spin up a local React App and Node server to provide an interface for quick Vintage Story quest generation. Based off of Gerste's VSQuest and VSQuestExample mods.

## Getting Started

1) Create a `.env` file at the root level of the repo.
2) Add the following:

- `NODE_ENV=dev`
- `PORT=5000`

3) Add a `BASE_PATH` to the `.env` pointing to the repo on your computer.

- ex.: `BASE_PATH=/Users/Amigurumi/Dev/Elsewhere/elsewherequests/`

4) In terminal run the following:

- `npm i`
- `npm start`

5) open a second terminal and run:

- `cd client`
- `npm i`
- `npm start`

6) Open `localhost:3000` in your browser to access the ui and begin editting your quests

7) When you are ready to export the generated mod zip the contents of the `generatedMod` folder and it will be ready to use as a Vintage Story mod.
