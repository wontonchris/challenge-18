const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  
} = require('../controllers/user-controller');

// const { updateUser } = require('../controllers/user-controller');

// router.put('/:id', updateUser);

// const { addFriend } = require('../controllers/user-controller');

// router.post('/:userId/friends/:friendId', addFriend);



// GET & POST at /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

module.exports = router;
