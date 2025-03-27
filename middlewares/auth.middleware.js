const userModel = require('../models/user.model')
const blacklistModel = require('../models/blacklist.model')
const jwt = require('jsonwebtoken')


module.exports.isAuthenticated = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]

        const isBlacklisted = await blacklistModel.findOne({token})
        if(isBlacklisted){
            return res.status(401).json({message: 'Unauthorized'})
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findOne({_id: decodedToken.id})
        
        if(!user){
            return res.status(401).json({message: 'Unauthorized'})
        }
        req.user = user
        next()
        }catch(err){
            next(err)
    }
}