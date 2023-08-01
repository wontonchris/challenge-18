const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser
} = require('../controllers/user-controller');

// GET & POST at /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

module.exports = router;
