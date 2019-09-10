/**
 * @purpose This file process create user request
 * @author RMM
 * @date 10/09/2019
 */



/******************************* Handler function ***************************************/

function del(req, res) {
    console.log("In Users delete.js : delete() : start ")

    // Connect Database
    const collection = global.db.collection(global.config.usersCollection);

    collection.deleteOne({ user: req.params.uid }, function (err, result) {
        if (result && result.result && result.result.n > 0) res.status(200).send("User deleted successfully")
        else res.send("Deletion failed : User may not be present or something went wrong")
    })
}

/******************************* Export router *****************************************/

module.exports = del
