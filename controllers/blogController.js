const Blog = require('../models/Blog')

const blog_index = (req, res) => {
  Blog.find()
    .lean()
    .sort({ createdAt: -1 })
    .then((result) => {
      console.log(result)
      res.render('blogs/index', { title: 'All Blogs', blogs: result })
    })
    .catch((err) => console.log(err))
}

const blog_details = (req, res) => {
  Blog.findById(req.params.id)
    .lean()
    .then((result) => {
      res.render('blogs/details', { title: 'Blog Details', blog: result })
    })
    .catch((err) => res.status(404).render('404', { title: 'Page not found!' }))
}

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body)
  blog
    .save()
    .then((result) => {
      res.redirect('/blogs')
    })
    .catch((err) => console.log(err))
}

const blog_create_get = (req, res) => {
  res.render('blogs/create', { title: 'Create' })
}

const blog_delete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: '/blogs' })
    })
    .catch((err) => console.log(err))
}

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
}
