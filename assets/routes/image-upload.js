const express = require('express');
router = express.Router();
const upload = require('../../services/image-upload');
const {urlencoded} = require('express');
const singleImageUpload = upload.single('file');


router.post('/' , singleImageUpload, (req,res)=>{


  singleImageUpload(req,res, (err)=>{
    return res.json(req.file.location)
  })
})
module.exports = router