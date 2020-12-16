const express = require('express');
const app = express();
const cors = require('cors');
const sql = require('./config/db');
const port = 3000;

const { routes } = require('./config/routes');

app.use(express.json());
app.use(cors());

app.use('/', routes);

app.listen(port, () => {
    console.log('listening on port', port);
});