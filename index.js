require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000

//index
const indexRouter = require('./routes/index')
//admin settings + auth
const userRouter = require('./routes/user')
const roleRouter = require('./routes/role')
//fpl
const teamRouter = require('./routes/team')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/role', roleRouter)
app.use('/team', teamRouter)

app.listen(port, () => {
    console.log(`Listening at ${port}`)
})