const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
let Matiere = new Schema({
nom:{
    type:String,
    default:''
}
},
{
    timestamps:true
});

module.exports = mongoose.model('Matiere',Matiere);