const {Schema, model} = require('mongoose')
const Joi = require('joi')

const blogSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
}, {timestamps: true})

const validateBlogSchema = body => {
    const schema = Joi.object({
        title: Joi.string().required(),
        desc: Joi.string().required()
    })

    return schema.validate(body)
}

const Blogs = model("blog", blogSchema)

module.exports = { Blogs, validateBlogSchema}



















