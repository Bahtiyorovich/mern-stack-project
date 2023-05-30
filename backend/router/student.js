const express = require('express')
const router = express.Router()
const { Students, validateStudentSchema } = require('../models/studentSchema.js')

router.get('/', async (req, res ) => {
    try {
        const students = await Students.find({})

        if(students.length){
            res.status(200).json({state: true, msg: 'All Students info found', innerData: students})
        }else {
            res.status(201).json('Students array is empty at the moment')
        }
    } catch{
        res.status(500).json({state: false, msg: 'Students info not found', innerData: null})
    }
})

router.get('/:id', async(req, res) => {
    try {
        let {id} = req.params
        let oneStudentInfo = await Students.findById(id)

        if(!oneStudentInfo){
            return res.status(404).json({state: false, msg: "info not found", innerData: null})
        }

        res.status(200).json({state: true, msg: 'Student info found', innerData: oneStudentInfo})
    } catch {
        res.status(500).json({state: false, msg:'Server Error', innerData: null})
    }
})


router.post('/', async(req, res) => {
    try {
        const {error} = validateStudentSchema(req.body)
        if(error){
            return res.status(404).json({state: false, msg: error.details[0].message, innerData: null})
        }
        const newStudent = await Students.create(req.body)
        res.status(201).json({state: true, msg: 'New Student`s info created', innerData: newStudent})
    }catch{
        res.status(500).json({state: false, msg: 'server error', innerData: null})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params
        await Students.findByIdAndRemove(id)
        res.status(200).json({state: true, msg: 'Info deleted', innerData: null})
    } catch {
        res.status(500).json({state: false, msg: 'server error', innerData: null})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {error} = validateStudentSchema(req.body)
        if(error){
            return res.status(404).json({state: false, msg: error.details[0].message, innerData: null})
        }
        const updateStudentInfo = await Students.findByIdAndUpdate(id, req.body)
        res.status(201).json({state: true, msg: 'Student`s info updated', innerData: updateStudentInfo})
    } catch {
        res.status(500).json({state: false, msg:'server error', innerData: null})
    }
})


module.exports = router






































































































































































































