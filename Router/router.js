const express = require('express');
const router = express.Router();
const htmltoimageController=require('../controllers/htmltopdfimageController')

router.post('/generate', htmltoimageController.generatePdfAndImage);
module.exports=router;