const express = require('express');
const router = express.Router();
var fetchuser = require('../middlewere/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// 🚩 🚩
//ROUTE NO.1 
//  FETCH (GET) all the notes using GET "api/notes/fetchuser" . Login reqiured


router.get('/fetchallnotes', fetchuser, async (req, res) => {


    const notes = await Note.find({ user: req.user.id })


    res.json(notes);


})

// 🚩 🚩
//ROUTE NO.2
//  Add a new note using post  "api/notes/addnote" . Login reqiured

router.post('/addnote', fetchuser, [
    body('title', 'title at leatst three characters 😁').isLength({ min: 3 }),
    body('description', 'description must be at least 5 chracters 😁').isLength({ min: 5 }),
], async (req, res) => {
    try {


        const { title, description, tag } = req.body;
        // if there are errors return bad request and the errors 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote)
    }
    catch (error) {
        console.log(error.message);
        res.status(800).send("Internal Server Error occured 😠 ");

    }


})
//ROUTE 3

// Upadate an existing note using put  "api/notes/updatenote/:id" . Login reqiured
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {


        //Create a new note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        //Find the note to be updated and update it 
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({  "success":"The note has been updated" ,  note })
    } catch (error) {
        console.log(error.message);
        res.status(800).send("Internal Server Error occured 😠 ");
    }






})




//ROUTE 4

// Upadate an existing note using DELETE  "api/notes/updatenote/:id" . Login reqiured
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {


        //Find the note to be deleted and delete it 

        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "This note has been deleted ", note: note })
    } catch (error) {
        console.log(error.message);
        res.status(800).send("Internal Server Error occured 😠 ");

    }






})





module.exports = router