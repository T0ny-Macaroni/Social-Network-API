const User = require('../models/User');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if(!user) return res.status(404).json({message: 'User Not Found'});
            res.json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    createUser: async (req, res) => {
        try {
            const user = new User(req.body);
            await user.save();
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    updateUser: async (req, res) => {
        try {
            const user = await User.FindByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!user) return res.status(404).json({message: 'User Not Found'});
            res.json(user) 
        }catch (err) {
            res.status(500).json(err)
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if(!user) return res.status(404).json({message: 'User Not Found'})
            res.json({message: 'User Deleted'});
        }catch (err) {
            res.status(500).json(err)
        }
    },

    addFriend: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $addToSet: { friends: req.params.friendId }},
                { new: true }
            );
            if (!user) return res.status(404).json({message: 'User Not Found'});
            res.json(user);
        } catch (err) {
            res.status(500).json(err) 
        }
    },

    removeFriend: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $pull: { Friends: req.params.friendId }},
                { new: true }
            );
            if (!user) return res.status(404).json({message: 'User Not Found'})
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    }
};