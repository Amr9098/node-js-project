const express= require("express")
const cors= require("cors")
var app = express();    
var mysql = require('mysql');


app.use(cors(
{    credentials : true
}));
app.use(express.json());



   const routes= require('./routes/routes');

   app.use('/api',routes);


app.listen(4000,()=>console.log('server listening on port 4000'));
