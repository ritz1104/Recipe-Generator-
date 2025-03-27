const mongoose = require('mongoose')

const ConnectDB = ()=>{
try{
   mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDb Connected")
}).catch((err)=>{
    console.error(err) 
})
}catch(err){
    console.log(err)

}
}

module.exports = ConnectDB