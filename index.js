const express = require('express');
const shortid = require('shortid');
const generate = require("shortid").generate;

const app = express();
app.use(express.json())

const PORT = 5000

let dogs = [
    { id: generate(), name: "Indy", breed:"pitt"}
]

app.get("/dogs", (req, res) => {
    res.status(200).json({message: "dogs found!", data: dogs})
})

app.get("/dogs/:id", (req, res) => {
    const { id } = req.params
    let dog = dogs.find(dog => {dog.id === id})
    if ( !dog ) {
        res.status(404).json( { message: `dog with id: ${id} not found!` } )
    } else {
        res.status(200).json(dog)
    }
})

app.post(`/dogs`, (req, res) => {
    const { name, breed } = req.body
    if (!name || !breed) {
        res.status(400).json( { message: `name and breed are required!` } )
    } else {
        dog = { id: generate(), name, breed }
        dogs.push(dog)
        res.status(201).json({ message: "dog created", data: dog })
    }
})

app.put(`/dogs/:id`, (req, res) => {
    const { id } = req.params
    const { name, breed } = req.body
    const idxOfDog = dogs.findIndex(dog => dog.id === id )

    if (idxOfDog !== -1) {
        dogs[idxOfDog] = {id, name, breed}
        res.status(200).json({ id, name, breed})
    } else {
        res.status(404).json({
            message: `No dog with id ${id}`,
        })
    }

})

app.delete(`/dogs/:id`, (req, res) => {
    const { id } = req.params
    const idxOfDog = dogs.findIndex(dog => dog.id === id )

    if (idxOfDog === -1) {
        res.status(400).json({message: `${id} not found.`})
    } else {
        dogs.pop(idxOfDog)
        res.status(200).json({message: `Dog with id ${id} deleted.`})
    }
})

app.get("*", (req, res) => { 
    res.status(404).json({ message: "not found!"})
})


app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})