const router = require('express').Router();
const Etudiant = require('../models/etudiant.model');

router.route('/').get((req,res) =>{
    Etudiant.find()
.then(etudiants => res.json(etudiants))
.catch(err => res.status(400).json({message:'Aucun Etudiant'}));
});



router.route('/:id').get((req,res) =>{
    Etudiant.findById(req.params.id)

.then(etudiant => res.json(etudiant))
.catch(err => res.status(400).json({message:'Aucun Etudiant'}));
});

router.route('/:id').delete((req,res) =>{
    Etudiant.findByIdAndDelete(req.params.id)
.then(() => res.json({success:'Etudiant supprimé'}))
.catch(err => res.status(400).json({message:'Aucun Etudiant'}));
});

router.route('/modifier/:id').post((req,res) =>{
    const { nom,prenom,cne,filiere } = req.body;

    if(!nom  || !prenom  || !cne || !filiere){
        return res.status(400).json({message : 'Entrez tous les données !'});
    }
    Etudiant.findById(req.params.id)
    .then( etudiant =>{

        etudiant.nom = nom;
        etudiant.prenom = prenom;
        etudiant.cne = cne;
        etudiant.filiere = filiere;

        etudiant.save()
        .then(()=> res.json({success:'Mise a jour etudiant'}))
        .catch(err => res.status(400).json({message:'erreur, non maj '}));

    }).catch(err => res.status(400).json({message:'Aucun Etudiant'}));

});


router.route('/ajouter').post((req,res) =>{

    const { nom,prenom,cne,filiere } = req.body;

    if(!nom  || !prenom  || !cne || !filiere){
        return res.status(400).json({message : 'Entrez tous les données !'});
    }

    Etudiant.findOne({cne})
    .then( etudiant =>{ 
        if(etudiant) return res.status(400).json({message:'cne existe déja'});

        const nvEtudiant = new Etudiant();

     
        nvEtudiant.nom =  nom;
        nvEtudiant.prenom =  prenom;
        nvEtudiant.cne =  cne;
        nvEtudiant.filiere =  filiere;
        nvEtudiant.save()
        .then((etudiant) => {
            res.status(200).json(etudiant)
         
        }).catch(err => res.status(400).json({message : err}));

    })

});
module.exports =  router;