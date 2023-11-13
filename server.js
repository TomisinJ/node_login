const express = require('express')
const app = express()

app.use(express.json())

const users = []

// creating a route
// won't have a route exposing the users in a real app
// send the users as a response

app.get('/users', (req, res) => {
    res.json(users)
}) 

// need to create a user for authentication
// hash password
// pass json to server and convert it to a user in users variable

app.post('/users', (req, res) => {
    const user = { name: req.body.name, password: req.body.password }
    users.push(user)
    res.status(201).send()

})

app.listen(3000)