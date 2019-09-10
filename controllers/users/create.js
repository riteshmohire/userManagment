/**
 * @purpose This file process create user request
 * @author RMM
 * @date 10/09/2019
 */

/******************************* Require modules *****************************************/

let bcrypt = require('bcrypt')

/******************************* Handler function ***************************************/

function create(req, res) {
    console.log("In Users create.js : create() : start ")
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    if (req.body.confirmPassword) delete req.body.confirmPassword

    // Connect Database
    const collection = global.db.collection(global.config.usersCollection);

    // Check user name already present or not
    collection.find({}).toArray(function (err, result) {
        if (result && result.length) {
            res.status(400).send("User name already present ! Please try with another one !!")
        }else{
            // Insert some documents
            collection.insertOne(req.body, function (err, result) {
                let message = err === null ? result : { "message": "User Name may be present or something went wrong" }
                let status = err === null ? 201 : 400
                res.status(status).send(message)
            });
        }
    })
}

/******************************* Export router *****************************************/

module.exports = create
