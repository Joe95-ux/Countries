const { query } = require('express');
const express = require('express');
const _ = require("lodash");
const fetch = require('node-fetch');
const router = express.Router();

function getPagination(allCountries, len){
    const result = [];
    let index = 0;
    while(index < allCountries.length){

        result.push(allCountries.slice(index, index+len));

        index += len;


    }
    return result;

}

//country by region
const allRegions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

router.get('/:whatregion', async(req, res)=>{
    const pageSize = 20;
    let name = req.params.whatregion;
    const page_num = 1;
    const regions = allRegions.filter(region=>region !== name);
    try{
        const response = await fetch('https://restcountries.com/v3.1/region/' + name);
        const allCountries = await response.json();
        const pages = Math.ceil(allCountries.length / pageSize);
        const pagination = getPagination(allCountries, pageSize);
        const countries = pagination[page_num - 1];

        res.render('region', {
            countries: countries,
            page_num:page_num,
            totalPages:pages,
            name:name,
            regions
        })
    }catch(e){
        console.log(e);
    }
})

router.get('/:whatregion/:page', async(req, res)=>{
    const pageSize = 20;
    let name = req.params.whatregion;
    let page_num = parseInt(req.params.page);
    const regions = allRegions.filter(region=>region !== name);
    try{
        const response = await fetch('https://restcountries.com/v3.1/region/' + name);
        const allCountries = await response.json();
        const pages = Math.ceil(allCountries.length / pageSize);
        const pagination = getPagination(allCountries, pageSize);
        const countries = pagination[page_num - 1];

        res.render('region', {
            countries: countries,
            page_num:page_num,
            totalPages:pages,
            name:name,
            regions
        })
    }catch(e){
        console.log(e);
    }
})







module.exports = router;