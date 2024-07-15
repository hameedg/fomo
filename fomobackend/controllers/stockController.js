const axios = require('axios');
const Data = require('../models/stockModel');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const API_KEY = process.env.LIVECOINWATCH_API_KEY;
const API_URL = 'https://api.livecoinwatch.com/coins/single';

const fetchData = async (symbols) => {
  try {
    const responses = await Promise.all(
      symbols.map(symbol =>
        axios.post(API_URL, {
          currency: 'USD',
          code: symbol,
          meta: true
        }, {
          headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json'
          }
        })
      )
    );

    return responses.map(response => response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const saveData = async (data) => {
  try {
    await Data.insertMany(data);
    console.log('Data saved successfully.');
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

const pollData = async (req, res) => {
    const symbols = ['USDT', 'BTC', 'ETH', 'BNB', 'SOL'];
  const data = await fetchData(symbols);
  if (data.length > 0) {
    await saveData(data);
  }
  res.send('Data polled and saved successfully.');
};

const getRecentData = async (req, res) => {
  const { name } = req.params;
  console.log("frontend called",name);

  try {
    const recentData = await Data.find({ name })
      .sort({ timestamp: -1 })
      .limit(20); 

    res.json(recentData);
  } catch (error) {
    console.error('Error fetching recent data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { pollData, fetchData, saveData, getRecentData };


