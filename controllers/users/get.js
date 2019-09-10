/**
 * @purpose This file process get all user request
 * @author RMM
 * @date 10/09/2019
 */

/******************************* Handler function ***************************************/

function get(req, res) {
   console.log("In get.js : get() : start ")

   // Connect Database
   const collection = global.db.collection(global.config.usersCollection);

   collection.find({}).toArray(function (err, result) {
      if (result && result.length) {
         res.status(200).send(result)
      } else {
         res.status(400).send("Error while fetching users")
      }
   })
}

/******************************* Export router *****************************************/

module.exports = get
