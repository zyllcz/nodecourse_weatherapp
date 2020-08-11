
const path = require('path')
//console.log(__dirname)
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const port = process.env.PORT || 3000

//define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) //if want to customize hbs to use different directory default is views dir
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))
debugger

//setup routes to use hbs templates
app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather APP',
        name: 'MIKEZ'
    })
})

app.get('/product', (req,res)=>{
    const {search,rating} = req.query
    if(!search){
        return res.send({error: 'You must provide a search'})
    }

    res.send({item: 'test', price: 123})
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'MIKE Z'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        message: 'Have you tried turning if off and turning it back on?',
        title: 'Help Page',
        name: 'MIKE Z'
    })
})

app.get('/weather', (req,res)=>{
    const {address} = req.query
    if (!address){
        return res.send({error: 'A address or location must be provided'})
    }

    geocode(address, (error,data = {})=> {
        if (error){
            return res.send({error: 'error calling location service'})
        }
        //console.log('The current location is:', data.location)
        weather(data, (weatherError, weatherData) => {
            if (weatherError){
                return res.send({error: 'error calling weather service'})
            }
            res.send({address, location:data.location, forecast: weatherData})
        })
    })

})

//404 pages
app.get('/help/*', (req,res)=>{
    res.render('404',{
        message: 'Page not found try accessing help page for more info',
        title:" Help page does not exist",
        name: 'MIKE Z'
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        message: 'Page not found try accessing help page for more info',
        title:"Page does not exist",
        name: 'MIKE Z'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})
