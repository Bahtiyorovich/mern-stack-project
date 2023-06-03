const { Schema, model } = require("mongoose")
const Joi = require("joi")

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tel:{
        type: Array,
        required: true
    }
})

const Users = model("user", userSchema)

const validateUser = (body)=>{
    const schema = Joi.object({
        name: Joi.string().required(),
        username : Joi.string().required().min(4).max(16),
        password: Joi.string().required().min(8).max(32),
        tel: Joi.array().required()
    })
    return schema.validate(body)
}

module.exports = { Users, validateUser }