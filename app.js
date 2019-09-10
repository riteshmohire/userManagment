
const MongoClient = require('mongodb').MongoClient;
global.assert = require('assert');
let express = require('express')
let bodyParser = require('body-parser')
let jwt = require('jsonwebtoken')
const helmet = require('helmet')
let app = express()

let login = require('./controllers/session/login')
let logout = require('./controllers/session/logout')
let users = require('./route/users')

global.config = require('./config/config.json')
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// use helmet to secure HTTP headers
app.use(helmet())

function authenticate( req, res, next){
    jwt.verify(req.headers.token, global.config.secret, function(err, decoded) {
        decoded ? next() : res.status(400).send("Unauthorized access ")
    })
}

app.post('/session', login)

app.delete('/session', logout)

// API to create new user
app.post('/user', require(process.cwd() + "/controllers/users/create"))

// Users route
app.use('/user', authenticate, users)
 
app.get('/', function (req, res) {
  res.send('Wel come')
})

let port = process.env.NODE_ENV === "test" ? 8000 : 3000
app.listen(port, function(err, res){
   console.log(`Server started at http://localhost:${port}`)
 
    // Use connect method to connect to the server
    MongoClient.connect(global.config.dbUrl, function(err, client) {
        assert.equal(null, err);
        console.log("\n\n\n\n Connected successfully to server");
        
        global.db = client.db(global.config.dbName);   
    });
})

module.exports = app