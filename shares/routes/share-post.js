var express = require('express');
var router = express.Router();

/* Share a post. */
router.post('/post/:postId/share', async (req, res)=>{
  try{
    const postId = req.params.postId;
    res.send(`Post with postId: ${postId} shared successfully.`);
  } catch(error){
    console.error(`Error: ${error}`);
  }
});

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

/* Get Users who have shared the post by postId. */
router.get('/post/:postId/shared/users', async (req, res)=>{
  try{
    const postId = req.params.postId;
    const dummyUsers = [
      {
        name : 'Jaswant',
        email : 'jaswant.khati@publicissapient.com'
      },
      {
        name : 'Anant',
        email : 'anant@publicissapient.com'
      },
      {
        name : 'Jayesh',
        email : 'jayesh@publicissapient.com'
      }
    ] 
    res.send({
      postId,
      dummyUsers
    });
  } catch(error){
    console.error(`Error: ${error}`);
  }
});

module.exports = router;
