const {Thought} = require('../models/thoughts');
const User = require('../models/User');

module.exports = {
    getAllThoughts: async (req, res) => {
        try{
            const thoughts = await Thought.find().populate('username', 'username');
            res.json(thoughts);
        }catch (err) {
            res.status(500).json(err)
        }
    },

    getThoughtById: async (req, res) => {
        try {
            const thought = await Thought.findById(req.params.id);
            if (!thought) return res.status(404).json({ message: 'Thought not found' });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateThought: async (req, res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {new: true });
            if (!thought) return res.status(404).json[{ message: 'Thought not found' }]
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    deleteThought: async (req, res) => {
        try {
            const thought = await Thought.findByAndDelete(req.params.id);
            if (!thought) return res.status(404).json( {message: 'Thought Not Found' })

            // GOTTA get that bonus
            await User.updateOne({_id: thought.userId }, { $pull: {thoughts: thought._id }})

            res.json({ message: 'Thought Deleted'})
        }catch (err) {
            res.status(500).json(err)
        }
    },

    createReaction: async (req, res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $push: { reactions: req.body } },
                { new: true }
            );
            if (!thought) return res.status(404).json({ message: 'Thought Not Found' });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    deleteReaction: async (req, res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.body.reactionId } }},
                { new: true }
            );
            if (!thought) return res.status(404).json({ message: 'Thought not Found'})
            res.json(thought)
        } catch (err) {
        res.status(500).json(err);
        }
    }
};