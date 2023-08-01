const {Thought} = require('../models/Thoughts');
const {User} = require('../models/User');
//thoughts get all
const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        }
        );
    },
// get by user ID
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought associated with this id.'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    }
// create thought
    createThought({body}, res) {
        Thought.create(body)
        .then(dbThoughtData => {
            return User.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts: dbThoughtData._id}},
                {new: true}
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user associated with this id.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
// update thought
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought associated with this id.'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
// delete thought
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({message: 'No thought associated with this id.'});
            }
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {thoughts: params.id}},
                {new: true}
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user associated with this id.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    // Add Reactions to Thoughts
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true}
            

