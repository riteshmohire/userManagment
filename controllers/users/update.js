/**
 * @purpose This file process create user request
 * @author RMM
 * @date 10/09/2019
 */

/******************************* Require modules *****************************************/

let bcrypt = require('bcrypt')

/******************************* Handler function ***************************************/

function update(req, res) {
    console.log("In Users update.js : update() : start ")

    // Connect Database
    let body = req.body
    let fetchQuery = { user: req.params.uid }
    let updateObject = { $set: {} }

    // Connect Database
    const collection = global.db.collection(global.config.usersCollection);

    collection.find(fetchQuery).toArray(function (err, result) {

        if (body.user) updateObject.$set.user = body.user
        if (body.name) updateObject.$set.name = body.name
        if (body.contact) updateObject.$set.contact = body.contact
        if (body.password) updateObject.$set.password = bcrypt.hashSync(body.password, 10)

        collection.updateOne(fetchQuery, updateObject,function(err, result) {
            console.log(result.result)
            if(result) res.status(200).send("User data updated successfully")
            else res.send("Updatation failed")
        })
    })
}

/******************************* Export router *****************************************/

module.exports = update
