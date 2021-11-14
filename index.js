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
const playerRouter = require('./routes/player')
const squadRouter = require('./routes/squad')
//fpl match ++api
const matchRouter = require('./routes/match')
//marketplace
const priceRouter = require('./routes/price')
const marketRouter = require('./routes/market')
const creditRouter = require('./routes/credit')
const inventoryRouter = require('./routes/inventory')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/role', roleRouter)
app.use('/team', teamRouter)
app.use('/player', playerRouter)
app.use('/squad', squadRouter)
app.use('/match', matchRouter)
app.use('/price', priceRouter)
app.use('/market', marketRouter)
app.use('/credit', creditRouter)
app.use('/inventory', inventoryRouter)

app.listen(port, () => {
    console.log(`Listening at ${port}`)
})