const mongoose=require('mongoose')

const BlogPost=require('./models/Blogpost')

mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser:true})

let id='63c7b0066b0f267b29c54476'


BlogPost.findByIdAndDelete(id,{title:'updated title'},(error,blogspot)=>{
    console.log(error,blogspot)
})
