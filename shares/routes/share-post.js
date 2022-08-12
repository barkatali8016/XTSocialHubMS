var express = require('express');
var router = express.Router();

/* Share a post. */
router.post('/', function(req, res, next) {
  res.send('Post successfully shared');
});

module.exports = router;
