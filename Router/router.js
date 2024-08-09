const express = require('express');
const router = express.Router();
const htmltoimageController=require('../controllers/htmltopdfimageController')

router.post('/preview', htmltoimageController.generatePreviewPdfAndImage);
router.post('/save_and_download', htmltoimageController.savePdfAndDownload);
module.exports=router;