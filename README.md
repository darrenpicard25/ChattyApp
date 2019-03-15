# Chatty App
Chatty App is an instant messaging app for talking with your friends in real time

## Getting Started
- Fork this repository, then clone your fork of this repository to your local machine.
- Install dependencies using the npm install command in both folders.
- Start the web server using the "node server.js" command. The app will be served at http://localhost:3001
- Start up client side server using "npm start"
- Go to http://localhost:3000/ in your browser.

## Quick Look
!["Main Page"](https://github.com/darrenpicard25/ChattyApp/blob/master/images/snapshots/firstlook.png?raw=true)
- Talk to all users on the server. Keeps track of how many people are present
!["Posting Images"](https://github.com/darrenpicard25/ChattyApp/blob/master/images/snapshots/addingPictures.png?raw=true)
- Can add jpg, gif and png images to chat
!["Individual Color for users"](https://github.com/darrenpicard25/ChattyApp/blob/master/images/snapshots/individualLooks.png?raw=true)
- Users have unique colors to display

## Dependencies

#### Client
- "babel-core": "6.23.1"
- "babel-loader": "6.3.1"
- "babel-preset-es2015": "6.22.0"
- "babel-preset-react": "6.23.0"
- "babel-preset-stage-0": "6.22.0"
- "css-loader": "0.26.1"
- "eslint": "3.15.0"
- "eslint-plugin-react": "6.9.0"
- "node-sass": "4.5.0"
- "sass-loader": "6.0.0"
- "sockjs-client": "^1.1.2"
- "style-loader": "0.13.1"
- "webpack": "2.2.1"
- "webpack-dev-server": "2.3.0"

#### Server
- "express": "^4.16.4"
- "uuid": "^3.3.2"
- "ws": "^6.2.0"