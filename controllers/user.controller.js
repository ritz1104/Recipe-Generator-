const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blacklistModel = require('../models/blacklist.model')


module.exports.signup = async (req, res,next) => {
    try{
      const {name,email,password} = req.body
      if(!name || !email || !password){
        return res.status(400).json({message: 'All fields are required'})
      }

     const isUserAlreadyExists  =  await userModel.findOne({email})
     if(isUserAlreadyExists){
        return res.status(400).json({message: 'User already exists'})
     }

     bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hashedPassword) => {
          if(err){
            return res.status(500).json({message: 'Internal server error'})
          }
          const user = await userModel.create({
            name,
            email,
            password: hashedPassword
          })

            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
            res.status(201).json({
                message: 'User created successfully',
                user,
                token
            })
        
     })
     
    })

    } catch(err){
        next(err)
    }
}

module.exports.login = async (req, res, next) => {
    try{
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({message: 'All fields are required'})
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).json({message: 'Invalid email or password'})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid email or password'})
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.status.json({message: 'User Logged in successfully', token})
    } catch(err){
        next(err)
    }
}

module.exports.logout = async (req, res, next) => {
    try{
        const {token} = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(400).json({message: 'Token is required'})
        }
        const isTokenBlaclisted =  await blacklist.findOne({token})

        if(isTokenBlaclisted){
            return res.status(400).json({message: 'User already logged out'})
        }

        await blacklistModel.create({token})
    } catch(err){
        next(err)
    }
}