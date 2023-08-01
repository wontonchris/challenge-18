const { Thoughts } = require('../models/Thought');
const { User } = require('../models');

const thoughtController = {
  // get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get one thought by id
  async getThoughtById({ params }, res) {
    try {
      const thought = await Thoughts.findOne({ _id: params.id });
      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // createThought
  async createThought({ body }, res) {
    try {
      const thought = await Thoughts.create(body);
      const user = await User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // update thought by id
  async updateThought({ params, body }, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: params.id },
        body,
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // delete thought
  async deleteThought({ params }, res) {
    try {
      const thought = await Thoughts.findOneAndDelete({ _id: params.id });
      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
        return;
      }
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: params.id } },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // add reaction
  async addReaction({ params, body }, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: params.id },
        { $push: { reactions: body } },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // delete reaction
  async deleteReaction({ params }, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: params.id },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

module.exports = thoughtController;
