const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = 3000;

// Functions

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
//const { RSA_NO_PADDING } = require('constants');

// Define paths for Express config
const publicPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('',(req,res)=>{
    res.render('index',{
        name: 'Hector Adolfo',
        engine: 'hbs',
        tool:'Handlebars',
        title:'Weather-app'
    });
});

app.get('/about', (req,res)=>{
    res.render('about',{
        name:'Hector Adolfo',
        profession:'Software Engineer',
        title: 'About me...'

    });
});

app.get('/help', (req,res)=>{
    res.render('help',{
        message:'Hello user! ...Can I help you?',
        title: 'Help...',
        name:'Hector Adolfo'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    const address = req.query.address;
    //console.log(address);
    
    geocode(address,(error,{latitude,longitude,ubication}={})=>{
        if(error){
            return res.send({
                ERROR:error 
            });
        }
        //console.log(latitude);
        
        forecast({latitude,longitude},(error,dataForecast)=>{
            if(error){
               return res.send({
                    error
                });
            }else if(dataForecast){
                res.send({dataForecast,ubication});
            }
        })
    })

    //IMPORTANTE: Es importante indicar la palabra RETURN para cada ejecucion dentro
    //de las sentencias IF, ELSE o ELSE IF... ya que sin esta, al ejecutar nuestra
    //aplicación y obtener una respuesta inesperada nos generaría el siguiente error:
    //Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    //code: 'ERR_HTTP_HEADERS_SENT'
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term!'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: '404 Page',
        message: 'Help article not found!',
        name: 'Hector Adolfo'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title: '404 page',
        message: 'Page not found!',
        name: 'Hector Adolfo'
    })
})


app.listen(port,()=>{
    console.log(`Server listening at localhost:${port}/`)
});


// Init app command:
//nodemon src/app.js -e .js,.hbs