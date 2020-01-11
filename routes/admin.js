const router = require('express').Router();
const Admin = require('../models/admin.model');

router.route('/').get((req,res) =>{
    Admin.find()
.then(admins => res.json(admins))
.catch(err => res.status(400).json({message:'Aucun Etudiant'}));
});



router.route('/:id').get((req,res) =>{
    Admin.findById(req.params.id)

.then(admin => res.json(admin))
.catch(err => res.status(400).json({message:'Aucun Etudiant'}));
});

router.route('/:id').delete((req,res) =>{
    Admin.findByIdAndDelete(req.params.id)
.then(() => res.json({success:'Admin supprimé'}))
.catch(err => res.status(400).json({message:'Aucun Etudiant'}));
});

router.route('/modifier/:id').post((req,res) =>{
    const { username,password} = req.body;

    if(!username  || !password  ){
        return res.status(400).json({message : 'Entrez tous les données !'});
    }
    Admin.findById(req.params.id)
    .then( admin =>{

        admin.username = username;
        admin.password = password;
        admin.save()
        .then(()=> res.json({success:'Mise a jour admin'}))
        .catch(err => res.status(400).json({message:'erreur, non maj '}));

    }).catch(err => res.status(400).json({message:'Aucun admin'}));

});


router.route('/ajouter').post((req,res) =>{

    const { username,password } = req.body;

    if(!username  || !password ){
        return res.status(400).json({message : 'Entrez tous les données !'});
    }

    Admin.findOne({username})
    .then( admin =>{ 
        if(admin) return res.status(400).json({message:'username existe déja'});

        const nvAdmin = new Admin();

     
        nvAdmin.username =  username;
        nvAdmin.password =  password;  
        nvAdmin.save()
        .then((admin) => {
            res.status(200).json(admin)
         
        }).catch(err => res.status(400).json({message : err}));

    })

});

router.route('/login').post((req,res) =>{

    const { username,password } = req.body;

    if(!username  || !password ){
        return res.status(400).json({message : 'Entrez tous les données !'});
    }

    Admin.findOne({username})
    .then( admin =>{ 
        if(admin.password == password){
            res.status(200).json({success:true,message:'LoggedIn Successfully'})

        }else{
            res.status(400).json({success:false,message:'Erreur , mot de passe errone'})
        }
    }).catch(err => res.status(400).json({success:false,message:'Erreur ,nom utilistateur errone'}) );

});

module.exports =  router;