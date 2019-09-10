/**
 * @purpose This file process user logout request
 * @author RMM
 * @date 10/09/2019
 */

/******************************* Require modules *****************************************/

let jwt = require('jsonwebtoken')

/******************************* Handler function ***************************************/

function logout(req, res) {
   let token = req.header('token')
    //console.log("In logout.js : logout() : start ", JSON.stringify(token))

    jwt.verify(token, global.config.secret, function(err, decoded) {
        if(decoded){
           if(decoded && decoded.data && decoded.data[0].password) delete decoded.data[0].password
           res.send({ "Message" : "Logout successfully ", decoded})
        } else {
           res.status(400).send("Invalid token ")
        }
    })
}

/******************************* Export router *****************************************/

module.exports = logout
