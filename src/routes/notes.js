const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res) => {
   res.render('notes/addNotes');
});

router.post('/notes/addNotes',isAuthenticated , async (req, res) => {
   const { title, description } = req.body;
   const errors = [];
   if (!title) {
      errors.push({ text: 'Please Write a Title' });
   }
   if (!description) {
      errors.push({ text: 'Please Write a Description' });

   }
   if (errors.length > 0) {
      res.render('notes/addNotes', {
         errors,
         title,
         description
      });
   } else {
      const NewNote = new Note({ title, description });
      NewNote.user = req.user.id;
      await NewNote.save();
      req.flash('success_msg', 'Note Added Successfull');
      res.redirect('/notes')
   }
});
//ruta a la cual el formulario enviara la info
/* 
POST consiste en datos "ocultos" (porque el cliente no los ve) 
enviados por un formulario cuyo método de envío es post. Es adecuado para formularios. 
Los datos no son visibles.
*/

router.get('/notes',isAuthenticated , async (req, res) => {
   const notes = await Note.find({user: req.user.id}).sort({ Date: 'desc' });
   res.render('notes/all_notes', { notes });
});

router.get('/notes/edit/:id',isAuthenticated, async (req, res) => {
   const note = await Note.findById(req.params.id)
   res.render('notes/edit_note', { note });
});

router.put('/notes/edit_note/:id',isAuthenticated, async (req, res) => {
   const { title, description } = req.body;
   await Note.findByIdAndUpdate(req.params.id, { title, description });
   req.flash('success_msg', 'Nota Updated Successfull');
   res.redirect('/notes');

});

router.delete('/notes/delete/:id',isAuthenticated, async (req, res)=>{
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Nota Delete Successfull');

  res.redirect('/notes');
 
});

module.exports = router;