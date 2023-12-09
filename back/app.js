// build code express server
const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', require('./routes/auth'));



