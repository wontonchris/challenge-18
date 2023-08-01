const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// GET & POST at /api/users
router
    .route('/')
    .get()
    .post();

    //delete
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
//friend id
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

//get all
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

module.exports = router;