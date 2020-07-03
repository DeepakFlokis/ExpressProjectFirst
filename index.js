const express = require('express');
const path = require('path');
const logger = require('./middleware/logger')
const members = require('./Members');
const exphbs = require('express-handlebars')
const app = express();

//Init middleware
// app.use(logger)

//Handelbars Middleware
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

//Homepage route
app.get('/',(req,res)=> res.render('index',{
    title:'Member App',
    members
}))

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname ,"public",'index.html'))
// })

//Set a static folder
app.use(express.static(path.join(__dirname,'public')));

//members api routes
app.use('/api/members',require('./routes/api/members'))

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server Started at ${PORT}`))