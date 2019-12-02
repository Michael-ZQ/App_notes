const express = require('express');
const router = express.Router();

router.get('/notes/add',(req,res)=>{
    res.render('notes/addNotes');
});

router.post('/notes/addNotes', (req, res)=>{
     const {title, description} = req.body;
     const errors = [];
     if(!title){
        errors.push({text:'Please Write a Title'});
     }
     if(!description){
        errors.push({text:'Please Write a Description'});

     }
     if(errors.length > 0){
        res.render('notes/addNotes', {
            errors,
            title,
            description
        });
     }else{
        res.send('ok');
     }
}); 
//ruta a la cual el formulario enviara la info
/* 
POST consiste en datos "ocultos" (porque el cliente no los ve) 
enviados por un formulario cuyo método de envío es post. Es adecuado para formularios. 
Los datos no son visibles.
*/

router.get('/notes', (req, res)=>{
    res.send('Your Notes');
});


module.exports = router;