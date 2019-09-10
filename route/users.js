/**
 * @purpose This is users router file, to handle all user route requests
 * @author RMM
 * @date 10/09/2019
 */


/******************************* Require modules *****************************************/

let express = require('express')
let router = express.Router()


/******************************* Require files ******************************************/

let cwd = process.cwd() + "/controllers/users/"
let update = require(cwd + "update")
let del = require(cwd + "delete")
let get = require(cwd + "get")

/******************************* Define routes with handlers ***************************/

// define get all users route
router.get('/', get)

// define update users route 
router.put('/:uid', update)

// define delete users route 
router.delete('/:uid', del)

/******************************* Export router *****************************************/

module.exports = router
