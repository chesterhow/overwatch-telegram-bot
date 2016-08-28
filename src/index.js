import Messenger from './lib/messenger';

const bot = new Messenger();

console.log(process.env.APP_PORT);
bot.listen(process.env.APP_PORT || 443).then(() => { console.log('listen'); });
