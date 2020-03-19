const path = require('path')
const express = require('express')
const hbs =require('hbs')
// utils
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 
//
const app = express() 
// define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Hikari'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Hikari'
    })
})

app.get('/help',(req,res)=>{
  res.render('help',{
      title:'Help section',
      name:'IU'
  })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{location,latitude,longitude}={})=>{  

        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData={})=>{
            if(error){
                return res.send({error})
            }

            const {dailySummary} = forecastData
            return res.send({
                forecast:dailySummary,
                location,
                address:req.query.address

            })
        })
    })
    // res.send({
    //     forecast:'20 deg',
    //     location:'xiamen',
    //     address:req.query.address,
    // })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must procvider a search term'
        })
    }
    
    console.log({query:req.query})
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'IU',
        errorMessage:'help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'IU',
        errorMessage:'page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})