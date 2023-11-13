const express = require('express')
const app = express()

const users = []

// creating a route
// won't have a route exposing the users in a real app
// send the users as a response

app.get('/users', (req, res) => {
    res.json(users)
}) 

// need to create a user for authentication

app.listen(3000)