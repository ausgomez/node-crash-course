const mongoose = require('mongoose')
const Schema = mongoose.Schema

// The Schema is like the mold where the model will base off
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Blog = mongoose.model('Blog', blogSchema) // singular so it will match plural on DB

module.exports = Blog
