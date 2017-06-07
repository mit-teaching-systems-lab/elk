# elk
An educational, roleplay game for teachers to practice eliciting learner knowledge

Setup
---
 
```
npm install
```
 
 
Compile
---
 
```
npm run compile 
```

Run
---
 
```
node server.js
```

Deployed at https://tsl-elk.herokuapp.com/

Analyze data
---
==================================================================

## ELK Development: Getting Started
 
### Tech stack overview
 
#### Front end UI: React 
React is used in ELK for its reusable user interface (UI) components and speed (only renders the diff of existing DOM elements and updated one). All of the React files are in elk/app/Components. The Game/index.js and App.js are the top level React components that contain the rest of them, making them good starting points for understanding the application. 
 
#### Server and Server-client communication: node.js and socket.io
Server file can be found at server.js. ELK uses node server-side. 
 
Socket.io is used for server-client communication. Socket.IO boasts a synchronized, bilateral
exchange using a persistent channel, so both the server and clients can subscribe to rooms in order to receive broadcasts (as opposed to constantly pinging the server/client for updates).  Again, Game/index.js and App.js are good files to see client side examples. The socket can also get passed in as a React prop such as in ChatApp.js. Server.js shows socket.io being used server side. 
 
#### Back-end: Postgresql
Currently the back-end stores messages sent for each game. It is installed as an add-on via Heroku. Currently the back-end stores a single table for messages sent between users. Table headers are [gameID, player, message, timestamp]
 
#### Deployment: Heroku 
ELK is deployed at www.tsl-elk.herokuapp.com. Ask Kevin for collaboration permission. 

---------------------------------------
 
## Getting started with the codebase 

All React code is in app/Components. Game/index.js and App.js are good starting points for understanding the application front-end. Each file imports the React components so that can be a good way to understand the application structure. Game and App components are in turn imported by routes.js. GameBundle template are in app/GameBundles. Server and backend code is in server.js. The server stores game data, such as student/teacher id, gamebundle data, player answers etc.) in a gameIDs dictionary, only messages are stored in the backend. 
 
### Setting up for development 
 
#### Downloading the Git repo 
1. Install GitHub to get code using the instructions here: https://gist.github.com/derhuerst/1b15ff4652a867391f03
2. Ask Kevin (or any other lab developer) to give you access to the ELK repo
3. Download the git repo using any of the following options :
4. In cmd, “git clone https://github.com/mit-teaching-systems-lab/elk.git” 
5. Go to https://github.com/mit-teaching-systems-lab/elk to download
 
#### Download Node, NPM and installing dependencies 
1. Instructions for windows here: http://blog.teamtreehouse.com/install-node-js-npm-windows. Note: may not require restarting laptop if “node -v” gives a version number 
2. In command prompt/terminal/cmd, navigate to the the ELK folder and run ‘npm install’ to download dependencies 
 
#### Running the application locally 
1. In cmd, run ‘node server.js’ 
2. Open up a web browser (Chrome has best compatibility) and navigate to localhost:3333
 
#### Updating GameBundles 
1. For editing GameBundles, make changes to corresponding file in GameBundles 
2. For adding a new GameBundle
3. Save a new file using the GameBundle using the template. JSON doesn’t allow comments so be sure to delete them otherwise an error will be thrown 
4. In app/routes.js, add the GameBundle id to bundles dict
5. In app/Components/App.js, add GameBundle id to games dictionary (currently in render method) 
 
#### Deploying to Heroku 
1. In cmd, ‘git push heroku yourbranch:master’
2. Navigate to www.tsl-elk.herokuapp.com 

---------------------------------------

## Future Projects 

1. Choose random student profile + question combinations
	- studentID in Game/index.js is currently hardcoded so first profile in gamebundle is always selected. 
	- Quiz.js currently iterates through all questions in GameBundles. Change to randomly select subset of questions. Depending on implementation method, other relevant files may include Scores.js and server.js 
2. Refactor game bundle logic so that it uses id numbers and not indices in the array. 
	- Relevant files: Game/index.js, GameBundles (for testing) 
3. Adding scores to database, redoing things on the database to fit future needs
4. Work with 11.125 data
	- Two sets of data: surveys on google drive and chat transcripts in postgres 
	- Surveys can be linked to transcripts using gameID and player role (recorded in table in backend and self-reported in survey). 
