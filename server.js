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
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

// find function

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }
})

app.listen(3000)