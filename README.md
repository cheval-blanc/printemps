# Printemps
[![Build Status](https://travis-ci.org/cest-tout/printemps.svg?branch=master)](https://travis-ci.org/cest-tout/printemps)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)


## Getting Started
Prerequisites: [Node.js](https://nodejs.org/) (`>=10.17.0`, or `>=12.0.0`)

Project setup
```sh
$ npm install
```

Compile and minify for production
```sh
$ npm run build
```

### Usage
Locate your audio files (`.mp3`, `.mp4`, or `.m4a`) in `$PROJECT_HOME/audio_files`. When start up the server, it will read and import information of audio files to database. 

After that, you can start up a Printemps server and enjoy your music!:headphones:
```sh
$ npm start
```


## Screenshots
![example](https://user-images.githubusercontent.com/26314307/73606861-4f1e2800-45f2-11ea-8cb6-b3c6413fab3b.png)


## Development
Compile and hot reload for development
```sh
$ npm run dev
```

Lint `.js` and `.vue` files
```sh
$ npm run lint
```
