const mongoose = require('mongoose')

const schema = mongoose.schema;

const recipeSchema = new schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    ingredients:[{
        type: String,
        required: true
    }],
    instructions:{
        type: String,
        required: true
    },
    source:{
        type: String,
        default:"gemini"
    },
    originalQuery:{
        type: String,
    }

},{timestamps:true})

module.exports = mongoose.model('recipe',recipeSchema)