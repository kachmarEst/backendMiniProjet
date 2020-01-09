const router = require('express').Router();
const Notes = require('../models/notes.model');
const Matiere = require('../models/matiere.model');
const Etudiant = require('../models/etudiant.model');

router.route('/').get((req,res) =>{
    Notes.find()
.then(notes => res.json(notes))
.catch(err => res.status(400).json({message:'Aucun Notes'}));
});



router.route('/all/:id').get((req,res) =>{
    etudiant_id=req.params.id;
    Notes.find({etudiant_id})
.then(notes => res.json(notes))
.catch(err => res.status(400).json({message:'Aucun Notes'}));
});


router.route('/:id').get((req,res) =>{
    Notes.findById(req.params.id)

.then(notes => {
    Matiere.findById(notes.matiere_id)
    .then(matiere =>{
        Etudiant.findById(notes.etudiant_id)
        .then(etudiant=>{
            res.json({notes,matiere,etudiant})
        })    .catch(err => res.status(400).json({message:'Aucun Etudiant'}));

    })
    .catch(err => res.status(400).json({message:'Aucun Matiere'}));


})
.catch(err => res.status(400).json({message:'Aucun Note'}));
});

router.route('/:id').delete((req,res) =>{
    Notes.findByIdAndDelete(req.params.id)
.then(() => res.json({success:'Note supprimé'}))
.catch(err => res.status(400).json({message:'Aucun Note'}));
});

router.route('/modifier/:id').post((req,res) =>{
    const { etudiant_id,note,matiere_id } = req.body;

    if(!etudiant_id  || !note  || !matiere_id ){
        return res.status(400).json({message : 'Entrez tous les données !'});
    }
    Notes.findById(req.params.id)
    .then( thenote =>{

        thenote.etudiant_id = etudiant_id;
        thenote.note = note;
        thenote.matiere_id = matiere_id;
        thenote.save()
        .then(()=> res.json({success:'Mise a jour note'}))
        .catch(err => res.status(400).json({message:'erreur, non maj ',thenote}));

    }).catch(err => res.status(400).json({message:'Aucun note'}));

});


router.route('/ajouter').post((req,res) =>{

    const { etudiant_id,note,matiere_id } = req.body;
    if(!etudiant_id  || !note  || !matiere_id ){
        return res.status(400).json({message : 'Entrez tous les données !'});
    }

  
        const nvNote = new Notes();

     
        nvNote.etudiant_id =  etudiant_id;
        nvNote.note =  note;
        nvNote.matiere_id =  matiere_id;
        nvNote.save()
        .then((note) => {
            res.status(200).json(note)
         
        }).catch(err => res.status(400).json({message : err}));

    

});
module.exports =  router;