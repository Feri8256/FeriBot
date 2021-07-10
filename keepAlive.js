const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.redirect('/poing');
});

app.get('/poing', (req, res) => {
    res.status(200).send('hey');
    res.end();
});
