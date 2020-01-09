const router = require('express').Router();
const Matiere = require('../models/matiere.model');

router.route('/').get((req,res) =>{
    Matiere.find()
.then(matieres => res.json(matieres))
.catch(err => res.status(400).json({message:'Aucune Matiere'}));
});



router.route('/:id').get((req,res) =>{
    Matiere.findById(req.params.id)

.then(matiere => res.json(matiere))
.catch(err => res.status(400).json({message:'Aucun Matiere'}));
});

router.route('/:id').delete((req,res) =>{
    Matiere.findByIdAndDelete(req.params.id)
.then(() => res.json({success:'Matiere supprimé'}))
.catch(err => res.status(400).json({message:'Aucun Matiere'}));
});

router.route('/modifier/:id').post((req,res) =>{
    const { nom } = req.body;

    if(!nom  ){
        return res.status(400).json({message : 'nom obligatoire'});
    }
    Matiere.findById(req.params.id)
    .then( matiere =>{
        matiere.nom = nom;
        matiere.save()
        .then(()=> res.json({success:'Mise a jour matiere'}))
        .catch(err => res.status(400).json({message:'erreur, non maj '}));

    }).catch(err => res.status(400).json({message:'Aucun matiere'}));

});


router.route('/ajouter').post((req,res) =>{

    const { nom } = req.body;

    if(!nom){
        return res.status(400).json({message : 'nom obligatoire'});
    }

    Matiere.findOne({nom})
    .then( matiere =>{ 
        if(matiere) return res.status(400).json({message:'nom existe déja'});

        const nvMatiere = new Matiere();

     
        nvMatiere.nom =  nom;
        nvMatiere.save()
        .then((matiere) => {
            res.status(200).json(matiere)
         
        }).catch(err => res.status(400).json({message : err}));

    })

});
module.exports =  router;