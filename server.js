const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 8000;
const etudiantsRouter = require('./routes/etudiant');
const matieresRouter = require('./routes/matiere');
const notesRouter = require('./routes/notes');
const adminsRouter = require('./routes/admin');




app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Karkaih:Karkaih04@cluster-jrtmy.mongodb.net/gnotes?retryWrites=true&w=majority',{ useNewUrlParser: true,useCreateIndex:true} );
const connection = mongoose.connection;

connection.once('open',function(){
    console.log("MongoDB database connection established successfully");
});

app.use('/etudiants',etudiantsRouter);
app.use('/matieres',matieresRouter);
app.use('/notes',notesRouter);
app.use('/admins',adminsRouter);

 
app.listen(PORT,function(){
    console.log("the Server is running on Port :"+ PORT);
});