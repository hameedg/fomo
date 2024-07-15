const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const stockRoutes = require('./routes/stockRoute');
const { fetchData, saveData } = require('./controllers/stockController'); 

dotenv.config({ path: './.env' });

const POLL_INTERVAL = process.env.POLL_INTERVAL || 10000;

connectDB();

const app = express();                      

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001',
}));

app.use('/api/v1', stockRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  startPolling();
});

const startPolling = () => {
  setInterval(async () => {
const symbols = ['USDT', 'BTC', 'ETH', 'BNB', 'SOL'];
    const data = await fetchData(symbols);
    if (data.length > 0) {
      await saveData(data);
    }
  }, POLL_INTERVAL);
};
