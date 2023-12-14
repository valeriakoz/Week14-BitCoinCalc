const express = require('express');
const axios = require('axios');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res)=> { //req - request, res - responce
    res.render('index', {data: ''});
});

app.post('/calculate', (req, res) => {
    let userCoins = req.body.userCoins;
    let userCurrency = req.body.currency;

    let url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

    axios.get(url)
    .then(response => {
        let bitCoinData = response.data;

        let result = {
            code: '',
            worth: '',
            disclaimer: bitCoinData.disclaimer
        }

        if(userCurrency == "EUR"){
            result.code = bitCoinData.bpi.EUR.code;
            result.worth = userCoins * bitCoinData.bpi.EUR.rate_float;
        }
        else if (userCurrency == "USD"){
            result.code = bitCoinData.bpi.USD.code;
            result.worth = userCoins * bitCoinData.bpi.USD.rate_float;
        }

        res.render('index', {data: result} );

    });
});

let port = 5000;

app.listen(port,()=>{
    console.log(`Server is running ${port}`);
})