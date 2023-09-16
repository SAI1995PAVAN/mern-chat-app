const mongoose = require('mongoose');


const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('mongo connection established')
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectToDb