const express = require("express");

router = express.Router();
const ah = (handler) => (req, res, next) => handler(req, res, next).catch(next);

// router.get('/', ah(async (req, res, next) => {

//   // const res = await fetch('http://localhost:8080/apiposts/following/:userId')

// }))
//

module.exports = router;
