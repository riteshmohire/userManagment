# userManagment

# MongoDB config -

Create "newProject" database and "users" collection in MongoDB

# Start server -

Execute command - node app.js 
Server will start on port number 3000


# API's-

1. Create new user - POST /user
2. Login to get token - POST /session 
3. Logout - DELETE /session
4. Update user - PUT /user/:userID
5. Get all users - GET /user
6. Delete user - DELETE /user/:userID

# POSTMAN collection - 

Get postman collection at root level - UserManagment.postman_collection.json
Git Link - https://github.com/riteshmohire/userManagment/blob/master/UserManagment.postman_collection.json

# Test

Execute command - test or mocha test.js
Test server will execute test cases on port number - 8000



