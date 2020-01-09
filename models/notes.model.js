const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
let Notes = new Schema({
matiere_id:{
    type:String,
    default:''
},
etudiant_id:{
    type:String,
    default:''
},
note:{
    type:Number,
    default:''
}
},
{
    timestamps:true
});

module.exports = mongoose.model('Notes',Notes);