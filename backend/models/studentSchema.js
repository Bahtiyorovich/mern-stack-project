const {Schema, model} = require('mongoose')
const Joi = require('joi')

const StudentSchema = new Schema ({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    tel: {
        type: Array,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    isMarried: {
        type: Boolean,
        require: true
    }
}, {timestamps: true})

const validateStudentSchema = body => {
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        age: Joi.number().required(),
        tel: Joi.array().required(),
        gender: Joi.string().required(),
        isMarried: Joi.boolean().required()
    })

    return schema.validate(body)
}

const Students = model('student', StudentSchema)

module.exports = { Students, validateStudentSchema }