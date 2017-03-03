import Messenger from './lib/messenger';

const bot = new Messenger();

bot.listen().then(() => { console.log('Listening'); });
