const express = require('express'); 
const bodyParser = require('body-parser'); 
const hbs = require('hbs'); 
const path = require('path'); 
const request = require('postman-request');
const axios = require('axios'); 

const sanatizeDetails = require('./utils/sanatizeDetails');
const designData = require('./utils/designData')

const app = express(); 

const viewsPath = path.join(__dirname, '/views')
const publicPath = path.join(__dirname, '/public')
const partialsPath = path.join(__dirname, '/views/partials')

app.use(express.json()); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static(publicPath))


app.set('view engine', 'hbs'); 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('/', async (req,res)=> {

    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/all`)
        
        const cards = response.data.map(el=> {
            return { 
                image: el.flag,
                name: el.name,
                code: el.alpha3Code,
                population: el.population.toLocaleString(),
                region: el.region,
                capital: el.capital
            }
        }); 

        res.render('index', {cards});

    } catch (error) {
        
        res.status(404).render('404', {error}); 
    }

   
    
});

app.get('/search', async (req,res)=> {
    const name = req.query.SEARCH; 
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/name/${name}?filter=flag;name;alpha3code;population;region;capital`); 

        const cards = response.data.map(el=> {
            return { 
                image: el.flag,
                name: el.name,
                code: el.alpha3Code,
                population: el.population.toLocaleString(),
                region: el.region,
                capital: el.capital
            }
        
        }); 

        res.render('index', {cards});        
    } catch (error) {
        
        res.status(404).render('404', {error}); 
    }


    
})

app.get('/:region', async (req,res)=> {
    

    const region = req.params.region;  

    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/region/${region}?filter=flag;name;alpha3code;population;region;capital`); 

        const cards = response.data.map(el=> {
            return { 
                image: el.flag,
                name: el.name,
                code: el.alpha3Code,
                population: el.population.toLocaleString(),
                region: el.region,
                capital: el.capital
            }
        }); 

    res.render('index', {cards});
    } catch (error) {
        
        res.status(404).render('404', {error}); 
        
    }



})

app.get('/details/:country', async(req,res)=> {
    const country = req.params.country; 
    
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/alpha/${country}?filter=flag;name;nativeName;population;region;subregion;capital;topLevelDomain;currencies;languages;borders`)
        
        let data = { 
            image: response.data.flag,
            name: response.data.name,
            nativeName: response.data.nativeName,
            population: response.data.population,
            region: response.data.region,
            subRegion: response.data.subregion,
            capital: response.data.capital,
            topLevelDomain: response.data.topLevelDomain, 
            currencies: response.data.currencies, 
            languages: response.data.languages,
            borders: response.data.borders
        }

        data = sanatizeDetails(data); 

        res.render('details', {data})

    } catch (error) {
        
        res.status(404).render('404', {error}); 
    }
    
   
});


app.all('*', (req,res)=> {
    res.status(404).render('404'); 
}); 

app.listen(process.env.PORT || 3000, ()=> {
    console.log('server started'); 
});