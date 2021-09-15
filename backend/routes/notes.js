const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const Notes = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Getting All Notes
router.get('/fetchNotes',fetchUser,async (req,res)=>{
    try {
        const notes = await Notes.find({user:req.user.id});
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
      } 
})

// Adding a note
router.post('/addNotes',[
    body("title", "Please Enter a Title").isLength({ min: 3 }),
    body("description", " Enter description of atLeast of 5 character").isLength({ min: 5 }),
  ],fetchUser,async (req,res)=>{
    const errors = validationResult(req);
    const {title,description,tag} = req.body;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    //     let note = await Notes.findOne({ title: req.body.title });
    //   if (note) {
    //     return res
    //       .status(400)
    //       .json({ error: "Sorry a note with this title already Exist" });
    //   }
        let note = await Notes.create({
            title , description , tag, user : req.user.id
        })
        const saveNote= await note.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
      }
})


// Update a Note
router.put('/updateNotes/:id',fetchUser,async (req,res)=>{
    const {title,description,tag} = req.body;
    try {
        const newNote = {};
        if(title){
            newNote.title=title;
        }
        if(description){
            newNote.description=description;
        }
        if(tag){
            newNote.tag=tag;
        }
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note not found");
        }
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("No Access");
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
      }
})

// Deleting A Note
router.delete('/deleteNotes/:id',fetchUser,async (req,res)=>{
    try {
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note not found");
        }
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("No Access");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json("Note has been Deleted Successfully");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
      }
})

module.exports=router;