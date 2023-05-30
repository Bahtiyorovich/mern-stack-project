const express = require('express')
const router = express.Router()
const {Blogs, validateBlogSchema} = require('../models/blogSchema.js')


router.get('/', async (req, res) => {
    try{
        const blogs = await Blogs.find()
        if(blogs.length) {
            res.status(200).json({state: true, msg:'All products found', innerData: blogs})
        }
        else {
            res.status(201).json('Blog array is empty at the moment')
        }
    }catch(error){
        res.status(500).json({state: false, msg:'All products not found', innerData: null})
    }
})

// single route
router.get('/:id', async (req, res) => {
    try{
        let {id} = req.params
        let oneItem = await Blocks.findById(id)

        if(!oneItem){
            return res.status(404).json({state: false, msg:'This item is not defined', innerData: null})
        }

        res.status(200).json({state: true, msg: 'Item Found', innerData:oneItem})
    } catch{
        res.status(500).json({state: false ,msg:'server error', innerData: null})
    }
})

router.post('/', async (req, res) => {
    try{
        const {error} = validateBlogSchema(req.body)
        if(error){
            return res.status(404).json({state: false, msg: error.details[0].message, innerData: null})
        }
        const newBlog = await Blogs.create(req.body)
        res.status(201).json({state: true, msg:'New Blog created', innerData: newBlog})
    } catch{
        res.status(500).json({state: false, msg:'server error', innerData: null })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params
        await Blogs.findByIdAndRemove(id)
        res.status(200).json({status: true, msg:'deleted Item', innerData: null})
    } catch {
        res.status(500).json({state: false, msg:'server error', innerData: null})
    }
})


router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {error} = validateBlogSchema(req.body)
        if(error){
            return res.status(404).json({state: false, msg:error.details[0].message, innerData: null})
        }
        const updateItem = await Blocks.findByIdAndUpdate(id, req.body)
        res.status(201).json({state: true ,msg: 'Item is update', innerData: updateItem})
    } catch {
        res.status(500).json({ state: false , msg:'server error', innerData: null})
    }
})

module.exports = router






























































































































