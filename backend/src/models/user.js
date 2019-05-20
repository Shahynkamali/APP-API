const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Wine = require('./wine')

const userSchema = new mongoose.Schema({
    avatar:{
        type:Buffer,
    },
    name: {
        type: String,
        required: true,
        trim: true,

    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        },
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid!')
            }
        },
    },

    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password can not include password!')
            }
        }
    },
    tokens:[{
            token:{
                type:String,
                required:true,
            }
        }]
},
{
    timestamps: true,
    
})

userSchema.pre('remove', async function(next) {
    const user = this
    await Wine.deleteMany({
        owner: user._id
    })
    next()
})


userSchema.virtual('wines', {
    ref: "Wine",
    localField:'_id',
    foreignField: 'owner'
})


userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token 

}

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error("Unable to login!")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login!')
    }

    return user

}


userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }


    next()  
})

const User = mongoose.model('User', userSchema)


module.exports = User