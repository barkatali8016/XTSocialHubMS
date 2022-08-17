var express = require('express');
const dotEnv = require('dotenv');

var app = express();

const port = 5000;

const connectDB = require('./config/db');

const share_post_router = require('./routes/share-post');
const share_count_router = require('./routes/share-count');
const shared_users_router = require('./routes/shared-users');

app.listen(port, ()=> console.log(`Share API running on port: ${port}`));

dotEnv.config();
connectDB();

app.use([share_post_router, share_count_router, shared_users_router]);

