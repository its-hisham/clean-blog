
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

const Blogpost = require('./models/BlogPost')

const ejs = require('ejs')
const BlogPost = require('./models/BlogPost')
const app = new express()

const fileUpload = require('express-fileupload')


app.set('view engine', 'ejs')

const validateMiddlWare = (req,res,next) =>{
     if(req.files==null || req.body.title==null){
        return res.redirect('/posts/new')
     }
     next()
}


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(fileUpload())
app.use('/posts/store',validateMiddlWare)

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/', async (req, res) => {
    const blogposts = await Blogpost.find({})
    //console.log(blogposts)
    res.render('index', {
        blogposts: blogposts
    })
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})
app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost: blogpost
    })
})
app.get('/posts/new', (req, res) => {
    res.render('create')
});

app.post('/posts/store', async (req, res) => {
    let image = req.files.image
    //console.log(req.body);
    //console.log(req.files);
    image.mv(path.resolve(__dirname, 'public/img', image.name),
        async (error) => {
            await Blogpost.create({
                ...req.body,
                image: '/img/' + image.name
            })
            res.redirect('/')

        })


})

