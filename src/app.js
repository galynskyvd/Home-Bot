const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
const {bot: {token, host, port}} = require('./config/options.json');
const API = require('./api');
const Helpers = require('./helpers');
const Messages = require('./constants');

const bot = new TelegramBot(token);
const app = express();

bot.setWebHook(`${host}/bot${token}`);

app.use(bodyParser.json());

app.post(`/bot${token}`, (req, res) => {
	bot.processUpdate(req.body);
	res.sendStatus(200);
});

app.listen(port, () => {
	console.log(`Express server is listening on ${port}`);
});

bot.onText(/\/start/, (msg) => {
	const {from: {id}} = msg;

	if (!Helpers.checkUser(id)) {
		bot.sendMessage(id, Messages.DENY_PERMISSION);
	} else {
		bot.sendMessage(id, Messages.CHOOSE_METHOD, Helpers.getButtons());
	}
});

bot.on('callback_query', (msg) => {
	const {from: {id}, data: sensor, id: chatId} = msg;

	const {temp} = API.getMeteo({act: 'all', sensor});

	bot.sendMessage(id, `${Messages.CURRENT_TEMP}: ${temp}`);
	bot.sendMessage(id, Messages.GET_METHODS);

	bot.answerCallbackQuery(chatId, '', false);
});