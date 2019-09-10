/**
 * @purpose This file process user login request
 * @author RMM
 * @date 10/09/2019
 */

/******************************* Require modules *****************************************/

let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')

/******************************* Handler function ***************************************/

function login(req, res) {
    console.log("In login.js : login() : start ")

    // Connect Database
    const collection = global.db.collection(global.config.usersCollection);
    
    collection.find({'user': req.body.user}).toArray(function(err, result) {
        if(result && result.length && bcrypt.compareSync(req.body.password, result[0].password)){
            let token = jwt.sign({
                                  iat: Math.floor(Date.now() / 1000) - 10,
                                  exp: Math.floor(Date.now() / 1000) + (3600),
                                  data: result
                                 }, global.config.secret)
            res.setHeader('token', token)
            res.send({ "Message" : "Logged in successfully ", "Token" : token })
        } else {
          res.status(400).send("UserId or password may be wrong ")
        }
    })
}

/******************************* Export router *****************************************/

module.exports = login