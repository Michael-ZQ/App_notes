const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash'); // para enviar mensajes en mutliples vistas

//initiazations
const app = express();
require('./database'); 
 
//setings
app.set('port', process.env.PORT  || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',exphbs({ 
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'), 'partials'),
    extname:'.hbs'
}));
app.set('view engine','.hbs'); // configurando las views



//middlewares
app.use(express.urlencoded({extended: false}));  // para entender datos de un formulario
app.use(methodOverride('_method')); //sire para que los ofmularios puedan enviar otros tipos de metodos no solo get 
app.use(session({
    secret:'mysecret',
    resave: true,
    saveUninitialized: true
})); // configuraciones por default , para que express pueda allmazener los datos temporalmente 
app.use(flash());



//global variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));


//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server is Listen
app.listen(app.get('port'), ()=>{
    console.log('Server on Port',app.get('port'));
});