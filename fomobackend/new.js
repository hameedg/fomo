const axios = require('axios');

const symbols = ['USDT', 'BTC', 'ETH', 'BNB', 'SOL'];
const url = "https://api.livecoinwatch.com/coins/single";
const apiKey = "04512be6-3171-40cf-8e50-bd6993e67be4";

async function fetchCryptoData(symbol) {
  try {
    const response = await axios.post(url, {
      currency: "USD",
      code: symbol,
      meta: true,
    }, {
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
    });

    console.log(`Data for ${symbol}:`, response.data);
  } catch (error) {
    console.error(`Error fetching data for ${symbol}: ${error.response ? error.response.statusText : error.message}`);
  }
}

async function fetchAllData() {
  for (const symbol of symbols) {
    await fetchCryptoData(symbol);
  }
}

fetchAllData();
