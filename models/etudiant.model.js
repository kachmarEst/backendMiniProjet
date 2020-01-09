const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
let Etudiant = new Schema({
nom:{
    type:String,
    default:''
},
prenom:{
    type:String,
    default:''
},
filiere:{
    type:String,
    default:''
},
cne:{
    type:String,
    required:true,
    unique: true,
    trim:true
}
},
{
    timestamps:true
});

module.exports = mongoose.model('Etudiant',Etudiant);