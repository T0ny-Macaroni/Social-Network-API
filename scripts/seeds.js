const mongoose = require('mongoose');
require('dotenv').config();
const { User } = require('../models/User');
const { Thought } = require('../models/thoughts');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

const users = [
    { username: 'xxCodeKillerxx', email:'CodeKiller@gmail.com'},
    { username: 'HappyHacker', email: 'HappyHacker@gmail.com'}
];

const thoughts = [
    { thoughtText: 'Codings kinda gamer ya know', username: 'xxCodeKillerxx'}
    { thoughtText: 'Code scrolling when i close my eyes .>.', username:'HappyHacker'} 
];


const seedDatabase = async () => {
    try {
        await User.insertMany(users);
        console.log('Users Seeded');

        await Thought.insertMany(thoughts);
        console.log('Thoughts Seeded');

        mongoose.connection.close();
    }catch (err) {
        console.error(err);
        mongoose.connection.close()
    }
}

seedDatabase();