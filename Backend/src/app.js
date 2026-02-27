const express = require('express')
const noteModel = require('./model/note.model')
const app = express()
const path = require('path')
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(express.static("./public"))

app.post('/api/notes', async (req, res)=>{
    const {title, desc} = req.body
    const note = await noteModel.create({
        title, desc
    })
    res.status(201).json({
        message:"note created sucessfully",
        note
    })
})
app.get("/api/notes", async (req, res)=>{
    const notes = await noteModel.find()
    res.status(200).json({
        message: "notes fetched successfully",
        notes
    })
})
app.delete("/api/notes/:id", async (req, res)=>{
    const id = req.params.id
    const notes = await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"note deleted successfully"
    })
})
app.patch("/api/notes/:id", async (req, res)=>{
    const id = req.params.id
    const {desc} = req.body
    await noteModel.findByIdAndUpdate(id, {desc})
    res.status(200).json({
        message: "note updated successfully"
    })
})
app.use('*name', (req, res)=>{
    res.sendFile(path.join(__dirname, "..", './public/index.html'))
})
module.exports = app