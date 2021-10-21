require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const roleRouter = require('./routes/role')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/role', roleRouter)

app.listen(port, () => {
    console.log(`Listening at ${port}`)
})