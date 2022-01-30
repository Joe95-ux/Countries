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


//get country by name
router.get('/name', async(req, res)=>{
    let query = _.toLower(req.query.query);
    let name = encodeURIComponent(query);
    const pageSize = 20;
    let page_num = 1;
    try{
        const response = await fetch('https://restcountries.com/v2/name/' + name);
        const allCountries = await response.json();
        const pages = Math.ceil(allCountries.length / pageSize);
        const pagination = getPagination(allCountries, pageSize);
        const countries = pagination[page_num - 1];

        res.render('search', {
            countries: countries,
            query : query,
            page_num:page_num,
            totalPages:pages,
            name:name
        
        })
    }catch(e){
        console.log(e);
    }
})

//country by name next page
router.get('/:name/:page', async(req, res)=>{
    const pageSize = 20;
    let name = req.params.name;
    let query = req.params.name;
    
    let page_num = parseInt(req.params.page);
    try{
        const response = await fetch('https://restcountries.com/v2/name/' + name);
        const allCountries = await response.json();
        const pages = Math.ceil(allCountries.length / pageSize);
        const pagination = getPagination(allCountries, pageSize);
        const countries = pagination[page_num - 1];

        res.render('search', {
            countries: countries,
            query : query,
            page_num:page_num,
            totalPages:pages,
            name:name
        })
    }catch(e){
        console.log(e);
    }
})






module.exports = router;