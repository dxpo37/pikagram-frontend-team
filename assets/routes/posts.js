const express = require('express');

router = express.Router();
const ah = (handler) => (req, res, next) => handler(req, res, next).catch(next)

// router.get('/', ah(async (req, res, next) => {
  
  
//   // const res = await fetch('https://cryptic-river-74579.herokuapp.com/api/posts/following/:userId')
 
// }))
// 



module.exports = router