const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kirby Craft'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kirby Craft'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Welcome to the help page',
        name: 'Kirby Craft'
    })
})

app.get('/weather', (req, res) => {
    let address = req.query.address

    if(!address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    
    geocode(address, (err, { latitude, longitude, location } = {}) => {
 
        if(err) {
            return res.send({ err })
        } 
        
        forecast(latitude, longitude, (err, forecastData) => {
            if(err) {
                return res.send({ err })
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        errorMessage: 'Help article not found',
        name: 'Kirby Craft'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Kirby Craft'
    })
})

app.listen(5000, () => {
    console.log('Server running on 5000')
})