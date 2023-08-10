const {Schema, Types, model,} = require('mongoose');
const reactionSchema = require('./Reaction');
function dateFormat(date) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Schema for Thoughts
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal), 
        },
        username: {
            type: String,
            required: true,
        },
// Linked to Reaction.js
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtual: true,
            getters: true,
        },
        id: false,
    }
);

// Total Friends Count 

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

