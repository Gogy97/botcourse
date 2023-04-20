const TelegramApi = require('node-telegram-bot-api')
const {gameOptions,againOptions} = require('./options')
const token = '6017127564:AAGHqTdAmsI_PjobJU4Ht8i7B0SI4To_PEU'

const bot = new TelegramApi(token, {polling: true})

const chats = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Choose the number from 0 to 9 ')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber
    await bot.sendMessage(chatId, 'Try it !', gameOptions)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Begining'},
        {command: '/info', description: 'Take info about user'},
        {command: '/game', description: 'Play the game'}
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendSticker(chatId, `https://tlgrm.eu/_/stickers/7e8/aa6/7e8aa67b-ad91-4d61-8f62-301bde115989/192/1.webp`)
            return bot.sendMessage(chatId, `Welcome to PerchBot`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Your name ${msg.from.first_name} `)
        }
        if (text === '/game') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, 'I dont understand you')

    })
    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `You are right ${chats[chatId]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `You aro wrong, bot choose this number ${chats[chatId]}`, againOptions)
        }


    })
}

start()