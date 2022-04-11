// BUILD YOUR SERVER HERE
const express = require('express')

const User = require('./users/model')

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.end('<h1> Hello, world!</h1>')
})

server.get('/json', (req, res) => {
    res.json(" ya ya ya");
});

///

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'does not exist' })
            } else {
                res.json(user)
            }
        })
})


server.post('/api/users', (req, res) => {
    let user = req.body;
    if (!user.name || !user.bio) {
        res.status(400).json({ message: 'provide name and bio' })
    } else {
        User.insert(user)
            .then(user => {
                res.status(201).json(user)
            })
    }
})

server.put('/api/users/:id', (req, res) => {
    let id = req.params.id;
    let user = req.body;
    if (!user.name || !user.bio) {
        res.status(400).json({ message: 'provide name and bio' })
    } else {
        User.update(id, user)
            .then(updatedUser => {
                if (!updatedUser) {
                    res.status(404).json({ message: 'does not exist' })
                } else {
                    res.json(updatedUser)
                }
            })
    }
})

server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'does not exist' })
            } else {
                res.json(user)
            }
        })
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
