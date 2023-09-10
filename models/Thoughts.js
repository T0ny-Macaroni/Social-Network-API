const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const moment = require('moment');

const ReactionSchema= new Schema({
    reactionId: {
        type: Schema.types.objectId,
        default: mongoose.Types.ObjectId
    },
    reactionBody: {
        type: String, 
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => moment(timestamp).forma('MMM D, YYYY [at] hh:mm a')
    }
});

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => moment(timestamp).forma('MMM D, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
});

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought')