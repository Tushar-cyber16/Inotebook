const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route1: get all the notes...   GET '/api/notes/fetchallnotes'   login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {

    try{
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
    }catch(error){
        console.error(error.message);
        res.status(500).send("internal server error");
    }
});



//Route2: add notes...   POST '/api/notes/addnote'   login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({ min: 5, }),
  ],
  async (req, res) => {

    try{
    // if error return bad request and errors
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Notes({
      title,
      description,
      tag,
      user: req.user.id,
    });
    const savedNote=await note.save();
    res.json(savedNote);
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("internal server error");
  }
}
);



//Route3: update an existing note  PUT '/api/notes/updatenote'   login required
router.put("/updatenote/:id",fetchuser,async (req, res) => {
         const {title,description,tag} = req.body;
         try{
         const newnote= {};
         if(title) {newnote.title=title;}
         if(description) {newnote.description=description;}
         if(tag) {newnote.tag=tag;}

         // find note to update and update it 
         let note= await Notes.findById(req.params.id);
         if(!note) 
         {
            return  res.status(404).send("not found");
         }
// update only if user owns this note
         if(note.user.toString() !== req.user.id){
             return res.status(401).send("not allowed");
         }
         note = await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
         res.json({note});
        } catch(error){
            console.error(error.message);
            res.status(500).send("internal server error");
        }
});



//Route4: delete a existing note  DELETE '/api/notes/deletenote'   login required
router.delete("/deletenote/:id",fetchuser,async (req, res) => {

    try{
    // find note to delete and delete it 
    let note= await Notes.findById(req.params.id);
    if(!note) 
    {
       return  res.status(404).send("not found");
    }
// delete only if user owns this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":"note has been deleted",note:note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
}
});
module.exports = router;
