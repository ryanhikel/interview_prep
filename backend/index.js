const express = require('express');
const cors = require('cors');
const pool = require('./db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

const tasksRoutes = require('./api/tasks');
app.use('/api/tasks', tasksRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});