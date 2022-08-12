var express = require('express');
const dotEnv = require('dotenv');

var app = express();

const port = 5000;

const connectDB = require('./config/db');

const share_post_router = require('./routes/share-post');

app.listen(port, ()=> console.log(`Share API running on port: ${port}`));

dotEnv.config();
connectDB();

app.use(share_post_router);

