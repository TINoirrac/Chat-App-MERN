const mongoose = require('mongoose');

const mongoDb = 'mongodb://localhost:27017/chat_app'
const connect = async () => {
    try {
        await mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Connect database successfully!!!')
    } catch (error) {
        console.log('Error connecting database!!! ',error)
    }
}

module.exports ={connect}