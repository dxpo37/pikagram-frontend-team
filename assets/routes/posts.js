const express = require("express");

router = express.Router();
const ah = (handler) => (req, res, next) => handler(req, res, next).catch(next);

// router.get('/', ah(async (req, res, next) => {

//   // const res = await fetch('https://pikagram-api.herokuapp.com/apiposts/following/:userId')

// }))
//

module.exports = router;
