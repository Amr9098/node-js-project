const express= require("express")
const cors= require("cors")
var app = express();
const cookieParser = require('cookie-parser')


const corsOptions ={
    credentials:true,
   //  :200
}
app.use(cors(corsOptions));


app.use(cookieParser());


app.use(express.json());



   const routes= require('./routes/routes');

   app.use('/api',routes);


app.listen(4000,()=>console.log('server listening on port 4000'));
