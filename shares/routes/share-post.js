var express = require('express');
var router = express.Router();

/* Share a post. */
router.post('/api/post/:postId/share', async (req, res)=>{
  try{
    const postId = req.params.postId;
    res.send(`Post with postId: ${postId} shared successfully.`);
  } catch(error){
    console.error(`Error: ${error}`);
  }
});


module.exports = router;
