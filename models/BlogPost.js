const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: String,
    username: String,
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String

});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
//mongoose will create the model for our BlogPosts in collection

module.exports = BlogPost