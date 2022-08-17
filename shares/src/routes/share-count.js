var express = require('express');
var router = express.Router();

/* Get Share Count By PostId. */
router.get('/post/:postId/shareCount', async (req, res)=>{
    try{
      const postId = req.params.postId;
      const dummyCount = 5
      res.send(`Post with postId ${postId} is been shared ${dummyCount} times.`);
    } catch(error){
      console.error(`Error: ${error}`);
    }
  });

module.exports = router;