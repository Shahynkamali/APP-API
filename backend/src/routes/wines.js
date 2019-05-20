const express = require('express')
const Wine = require('../models/wine')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/wines', auth, async (req, res) => {
    const wine = new Wine({
        ...req.body,
        owner: req.user._id,

    })
    try {
        await wine.save()
        res.status(201).send(wine)
    } catch (e) {
        res.status(200).send(e)
    }
})

router.get('/wines/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const wine = await Wine.findOne({_id, owner: req.user._id})
        if (!wine) {
            return res.status(404).send(e)
        }
        res.send(wine)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/wines', auth, async (req, res) => {
    const match = {}
    const sort  = {}
    
    if(req.query.inStock){
        match.inStock =  req.query.inStock === 'true'
    } 
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        await req.user.populate({
            path:'wines',
            match,
            options:{
                    limit: parseInt(req.query.limit),
                    skip:parseInt(req.query.skip),
                    sort,
            }
        }).execPopulate()
        res.send(req.user.wines)
    } catch (e) {
        res.status(500).send()
    }
})





router.patch('/wines/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'inStock', 'cost', 'amount', 'description', 'color']
    const isValid = updates.every(update => allowedUpdates.includes(update))

    if (!isValid) {
        return res.status(400).send({
            error: "invalid update!"
        })
    }

    try {
        const wine = await Wine.findOne({
            _id: req.params.id,
            owner: req.user._id
        
        })
        if (!wine) {
            res.status(404).send()
        }
        updates.forEach(update=>wine[update] = req.body[update])
        await wine.save();
        res.send(wine)

    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/wines/:id', auth,  async (req, res) => {
    try {
        const wine = await Wine.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        })
        if (!wine) {
            return res.status(404).send(e)
        }
        res.send(wine)

    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router