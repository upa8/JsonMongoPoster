const mongoose = require('mongoose');

const post = new mongoose.Schema({
    url: { type: String, unique: true },
    title: String,
    description: String,
    postStatus:{
        approved: Boolean,
        posted : Boolean,
        deleted : Boolean,
        declined : Boolean
    },
    postedBy: {
        anonymous: Boolean,
        name: String,
        email: String,
        profileUrl: String
    },
    tags: Array
}, { timestamps: true });

const Post = mongoose.model('post', post);

module.exports = Post;