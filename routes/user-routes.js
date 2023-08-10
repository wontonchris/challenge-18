const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  
} = require('../controllers/user-controller');


router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

module.exports = router;
