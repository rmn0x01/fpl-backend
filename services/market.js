const db    = require('../libraries/db')
const transactionLogService = require('../services/transaction-log')
const priceService          = require('../services/price')
const inventoryService      = require('../services/inventory')
const creditService         = require('../services/credit')

//As long as transactions and credits dont have standalone function/endpoints, getAllTransactions and getAllCredits will remain in marketService,
//otherwise they will be moved to their own respective services

const getAllTransactions = async () => {
    try{
        let data = await transactionLogService.getAll()
        return data
    } catch (err){
        throw(err)
    }
}

const getAllCredits = async () => {
    try{
        let data = await creditService.getAll()
        return data
    } catch (err){
        throw(err)
    }
}

const buy = async (userId,squadId) => {
    try {
        const activity = 'buy'
        // get latest price
        let latestPrice = await priceService.getBySquad(squadId)
        if(latestPrice.length==0){
            throw 'Invalid ID'
        }
        //validate if exists
        const checkExisting = await inventoryService.getByUserAndSquad(userId, squadId)
        if(checkExisting.length>0){
            throw 'Already purchased'
        }
        //validate credits
        const userCredit = await creditService.getByUser(userId)
        console.log(userId)
        if(userCredit.length==0){
            throw 'Credit not found, ask administrator'
        } else if(userCredit[0].credit < latestPrice[0].latest_price){
            throw 'Insufficient Credit'
        }

        db.tx(async t => {
            // insert to log
            const priceId = latestPrice[0].price_id
            await transactionLogService.insert(userId, priceId, activity)
            // substract user's credit
            await creditService.subtractCredit(userId, latestPrice[0].latest_price)
            // insert to user's inventory
            await inventoryService.insert(userId, squadId)
        })
            .then(data => {

            })
            .catch(error => {
                throw(error)
            })
        return 'Purchased'
    } catch (err) {
        throw(err)
    }
}

const sell = async (userId, userInventoryId) => {
    try {
        const activity = 'sell'
        //validate if exists
        const checkExisting = await inventoryService.getById(userInventoryId)
        if(checkExisting.length==0){
            throw 'Invalid ID'
        }
        // get latest price
        const squadId = checkExisting[0].squad_id
        let latestPrice = await priceService.getBySquad(squadId)
        if(latestPrice.length==0){
            throw 'Invalid ID'
        }
        db.tx(async t => {
            //insert to log
            const priceId = latestPrice[0].price_id
            await transactionLogService.insert(userId, priceId, activity)
            // add user's credit
            await creditService.addCredit(userId, latestPrice[0].latest_price)
            //remove from user's inventory
            await inventoryService.remove(userInventoryId)
        })
            .then(data => {

            })
            .catch(error => {
                throw(error)
            })
        return 'Sold'
    } catch (err) {
        throw(err)
    }
}

module.exports = {
    getAllTransactions,
    getAllCredits,
    buy,
    sell
}