# Contact-Keeper
 Full stack mern application. 

# Notes ------------------->

# Register Users
    first create a model (dealing with mongoose)
    ex: create folder models
        file: User.js

    

# Connecting react to express (frontend to backend)

Using Concurrently

first create-react-app client/filename

after add scripts to backend package.json
    "client": "npm start --prefix client",
    "clientinstall": "npm install --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""

add script to react package.json
    BrowserList 
    "proxy": "http://localhost:5000"

Script to run from root
    npm run dev 