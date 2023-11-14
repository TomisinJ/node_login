const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

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
// salt so that 2 users with the same password don't have the same hash
// store salt

app.post('/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)

        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

app.listen(3000)