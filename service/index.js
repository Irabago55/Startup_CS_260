const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const app = express();

app.use(cors());

app.get('/api/quote', async (req, res) => {
  try {
    const response = await fetch('https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com',
        'x-rapidapi-key': '9db24a0080msh121ccc6c1888c35p1aa90bjsn65775fee3975'
      }
    });

    if (!response.ok) throw new Error(`Error fetching quote: ${response.statusText}`);

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});

