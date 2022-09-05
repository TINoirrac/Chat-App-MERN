const chatRouter= require('./chat')
const authRouter = require('./auth')

function route(app){
    app.use('/chat',chatRouter)
    app.use('/auth',authRouter)
}

module.exports = route