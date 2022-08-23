var express = require('express');
var router = express.Router();

/* Get Users who have shared the post by postId. */
router.get('/post/:postId/shared/users', async (req, res) => {
  try {
    const postId = req.params.postId;
    const dummyUsers = [
      {
        name: 'Jaswant',
        email: 'jaswant.khati@publicissapient.com'
      },
      {
        name: 'Anant',
        email: 'anant@publicissapient.com'
      },
      {
        name: 'Jayesh',
        email: 'jayesh@publicissapient.com'
      }
    ]
    res.send({
      postId,
      dummyUsers
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

module.exports = router;