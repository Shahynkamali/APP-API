const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('config')

const JWT_SECRET = config.get('JWT_SECRET')

const auth = async (req, res, next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim()
        const decoded = jwt.verify(token, JWT_SECRET)
        const user = await User.findOne({
            _id: decoded._id,
            'tokens.token':token
        })
                if(!user){
                    throw new Error()
                }

                req.token = token

                req.user = user
                next()

    } catch (e) {
        res.status(401).send({ error:"No Authorization "})
    }
}

module.exports = auth