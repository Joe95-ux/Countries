require("dotenv").config();
const express = require("express");
const _ = require("lodash");
const ejs = require("ejs");
const fetch = require("node-fetch");
const countriesRouter = require("./routes/countries");
const regionRouter = require("./routes/region");
const countryRouter = require("./routes/country");
const app = express();

app.use(express.static( __dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");


const apiKey = process.env.API_KEY;


function getPagination(allCountries, len){
    const result = [];
    let index = 0;
    while(index < allCountries.length){

        result.push(allCountries.slice(index, index+len));

        index += len;


    }
    return result;

}

app.get('/countries', async(req, res)=>{
    const pageSize = 24;
    const page_num = 1;
    try{
        const response = await fetch('https://restcountries.com/v2/all');
        const allCountries = await response.json();
        const pages = Math.ceil(allCountries.length / pageSize);
        const pagination = getPagination(allCountries, pageSize);
        const countries = pagination[page_num - 1];

        res.render('home', {
            countries: countries,
            page_num:page_num,
            totalPages:pages
        
        })
    }catch(e){
        console.log(e);
    }
})

app.get('/:page', async(req, res)=>{
    const pageSize = 24;
    let page_num = parseInt(req.params.page);
    try{
        const response = await fetch('https://restcountries.com/v2/all');
        const allCountries = await response.json();
        const pages = Math.ceil(allCountries.length / pageSize);
        const pagination = getPagination(allCountries, pageSize);
        const countries = pagination[page_num - 1];

        res.render('home', {
            countries: countries,
            page_num:page_num,
            totalPages:pages
        })
    }catch(e){
        console.log(e);
    }
})

app.get('/', (req, res)=>{
    res.redirect('/countries');
})





app.use('/countries', countriesRouter);
app.use('/region', regionRouter);
app.use('/countries', countryRouter);
const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
);
