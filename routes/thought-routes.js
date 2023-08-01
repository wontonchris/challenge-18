const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  deleteThought
} = require('../controllers/thought-controller');

// GET and POST at /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

// GET and DELETE at /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .delete(deleteThought);

module.exports = router;
