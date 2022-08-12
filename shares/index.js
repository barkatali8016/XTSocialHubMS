var express = require('express');
var app = express();
const port = 8080;

const share_post_router = require('./routes/share-post');

app.listen(port, ()=> console.log('API running'));

app.use('/share', share_post_router);

