const express = require('express');
const noteModel = require('./models/notes.model')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('./public'))

// POST /api/notes
app.post('/api/notes', async (req, res) => {
    const { title, description, age } = req.body

    const note = await noteModel.create({
        title, description, age
    })

    res.status(201).json({
        message: "Note Created Successfully",
        note
    })
})

// GET /api/notes
app.get('/api/notes', async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes Fetched Successfuly",
        notes
    })
})

//PATCH /api/notes/:id
app.patch('/api/notes/:id', async (req, res) => {
    const id = req.params.id;
    const { title, description, age } = req.body

    await noteModel.findByIdAndUpdate(id, { title, description, age })

    res.status(200).json({
        message: "Note Updated!"
    })
})

//DELETE /api/notes/:id
app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id;

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note Deleted!"
    })
})

app.use('*name', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/public/index.html'))
})

module.exports = app;