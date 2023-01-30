
const express = require('express')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

const Blogpost = require('./models/BlogPost')

const ejs = require('ejs')

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

const newPostController= require('./controllers/newPost')
const homeController= require('./controllers/home')
const storePostController= require('./controllers/newPost')
const getpostController= require('./controllers/storePost')

app.get('/', homeController)

app.get('/post/:id', getpostController)



app.get('/posts/new', newPostController)

app.post('/posts/store',storePostController)
