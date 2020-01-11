const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
let Admins = new Schema({
username:{
    type:String,
    default:''
},
password:{
    type:String,
    default:''
}
},
{
    timestamps:true
});

module.exports = mongoose.model('Admins',Admins);