const router = require('express').Router();
const { userInfoValidator } = require('../middlewares/validation');
const { getCurrentUser, updateUser } = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', userInfoValidator, updateUser);

module.exports = router;
