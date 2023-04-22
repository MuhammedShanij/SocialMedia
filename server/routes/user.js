const express = require('express');
const router = express.Router();
const { userSignUp, userLogin,verifyToken,editProfile,imageupload,removeimage,getUsers, follow ,getUser} = require('../controllers/user');


const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage }).fields([{ name: 'image', maxCount: 1 }]);



router.post('/signup',userSignUp)
router.post('/login',userLogin)
router.post('/verifyToken',verifyToken)
router.put('/editProfile/:Stoken',editProfile)
router.patch('/imageupload/:Stoken',upload,imageupload)
router.delete('/removeimage/:Stoken',removeimage)
router.get('/getSuggestions/:Stoken',getUsers)
router.patch('/follow/:Stoken/:userId',follow)
router.get('/getUser/:id',getUser)









module.exports = router;