const { query } = require('express');
const express = require('express');
const _ = require("lodash");
const fetch = require('node-fetch');
const router = express.Router();

// get languages

function getLanguages(country){
    let lanArr = country.languages;
    const allLan = [];
    for(let lan of lanArr){
        allLan.push(lan.name);
    }
    const langStr = allLan.join(', ');
    return langStr;
}

//readable population
function getPopulation(country){
    const pop = country.population;
    return pop.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}



router.get('/:name', async(req, res)=>{
    let query = _.toLower(req.params.name);
    let name = encodeURIComponent(query);
    try{
        const response = await fetch('https://restcountries.com/v2/name/' + name);
        const data = await response.json();
        const country = data[0];
        const languages = getLanguages(country);
        const population = getPopulation(country);
        res.render('country', {
            country: country,
            languages:languages,
            population:population
        
        })
    }catch(e){
        console.log(e);
    }
})

// router.post('/:name', (req, res)=>{

//     res.redirect('/countries');

// })

















module.exports = router;