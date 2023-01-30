const Blogpost = require('../models/BlogPost')

module.exports = async (req, res) => {
    const blogposts = await Blogpost.find({})
    //console.log(blogposts)
    res.render('index', {
        blogposts: blogposts
    })
}
