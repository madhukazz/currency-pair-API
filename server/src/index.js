const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middlewares

app.use(express.json());
app.use(cors());

//all currencies

app.get("/getAllCurrencies", async (req, res) => {
  const currencyUrl =
    "https://openexchangerates.org/api/currencies.json?app_id=4c2fe780f97b4da08ac78223ed2bbe56";

  try {
    const currencyResponse = await axios.get(currencyUrl);
    const currenciesData = currencyResponse.data;

    return res.json(currenciesData);
  } catch (error) {
    console.error(Error);
  }
});

// get convert result

app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
    req.query;

  try {
    const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=4c2fe780f97b4da08ac78223ed2bbe56`;
    const dataResponse = await axios.get(dataUrl);
    const rates = dataResponse.data.rates;

    //rates
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    //final
    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;
    return res.json(targetAmount.toFixed(2));

  } catch (error) {
    console.error(error);
  }
});

//listen port
app.listen(5000, console.log("server running on port 5000"));
