const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .get(userController.getUsers)
router
  .route('/publish')
  .post(userController.publish)

router
  .route('/store-state')
  .post(userController.saveStore)
module.exports = router;


