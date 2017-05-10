const config = require('./config');
const mongoose = require('mongoose');
const Post = require('./model');
const fs = require('fs');


const objects = JSON.parse(fs.readFileSync('data.json', 'utf8'));

let db = mongoose.connect(config.mongoUrl);

mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});

objects.data.forEach(function (obj, index) {
    var postData = new Post({
        url: obj.url,
        title: obj.title,
        description: obj.description,
        postedBy: {
            anonymous: obj.postedBy.anonymous,
            name: obj.postedBy.name,
            email: obj.postedBy.email,
            profileUrl: obj.postedBy.profileUrl
        },
        tags: obj.tags
    });

    postData.postStatus = {
        approved: obj.postStatus.approved,
        posted : obj.postStatus.posted,
        deleted : obj.postStatus.deleted,
        declined : obj.postStatus.declined
    };

    postData.save(function(err) {
        // error can occur if url is not unique
        // return error if there is an error in post method
        if (err){
            throw err;
        }
        console.log('Post is saved');
    });
});

