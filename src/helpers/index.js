const {users} = require('../config/options.json');

const methods = {
	checkUser(userId) {
		return users.some(item => item === userId)
	},
	getButtons() {
		const variants = [
			{
				text: 'Температура сейчас',
				callback_data: 'all'
			}
		];

		return {
			reply_markup: JSON.stringify({
				inline_keyboard: [variants.map(({text, callback_data}) => ({
					text,
					callback_data
				}))],
				parse_mode: 'Markdown'
			})
		}
	}
};

module.exports = methods;