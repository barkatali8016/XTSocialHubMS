var express = require('express');
var router = express.Router();
const { STATUS_CODES } = require("../utils/app-errors");
const  SharePostModel  = require('../database/models/share-post');

/* Get Users who have shared the post by postId. */
router.get('/post/:postId/shared/users', async (req, res, next)=>{
    try{
      const postId = req.params.postId.toString();
      const getShareDetails = await SharePostModel.find({"postId": postId});
      if(getShareDetails.length){
        return res.status(STATUS_CODES.OK).json({postId, share_details: getShareDetails[0].share_details});
      }else{
        return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ error: "Post does not exist." });
      }
    } catch(error){
      next(error)
    }
  });
  
module.exports = router;