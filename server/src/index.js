const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//ALL CURRENCIES
app.get("/getAllCurrencies" , async(req, res) => {
    const nameURL = `https://openexchangerates.org/api/currencies.json?app_id=420b7d6e59f54ccd88148552439be1c6`;


    try{
        const namesResponce = await axios.get(nameURL);
        const nameData = namesResponce.data;
        
        return res.json(nameData);
    }
    catch(err){
        console.log(err);
    }
});

//get the target amount
app.get("/convert", async(req, res) => {
    const { 
        date,
        sourceCurrency,
        targetCurrency,
        amountInSourceCurrency} = req.query;
    
    try {
        const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=420b7d6e59f54ccd88148552439be1c6`
        
        const dataResponce = await axios.get(dataUrl);
        const rates = dataResponce.data.rates;

        //rates
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        //fina/ target value
        const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;
        
        return res.json(targetAmount.toFixed(2));
    }
    catch(err){
        console.error(err);
    }
})

//listen to a port
app.listen(5000 , () => {
    console.log("SERVER STARTED");
})

