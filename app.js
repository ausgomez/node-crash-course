const express = require('express')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogsRoutes = require('./routes/blog_routes')

// connect to mongo db
const DB_URI = 'mongodb+srv://anstroy:sonic123@cluster0-wcweq.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(3000)
    console.log('server started')
  })
  .catch((err) => console.log(err))

// express app
const app = express()

// register view engine
app.engine('.hbs', exphbs({ extname: '.hbs' }))
app.set('view engine', '.hbs')
// app.set('views', 'dirname_of_views')

// public dir
app.use(express.static(__dirname + '/public'))

// this is needed to access the req.body
app.use(express.urlencoded({ extended: true }))

// middleware
app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
  //res.sendFile('./views/index.html', { root: __dirname })
  res.redirect('/blogs')
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

// Blog Routes
app.use('/blogs', blogsRoutes)

// 404 - must be at the bottom since it applies to all the routes
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})
