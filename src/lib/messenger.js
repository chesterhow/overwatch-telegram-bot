import TelegramBot from 'node-telegram-bot-api';
import config from '../config';
import Validator from './validator';
import CommandHandler from '../handlers/commandHandler';

const validator = new Validator();

export default class Messenger {
  constructor() {
    // TODO: Figure out webhooks

    // if (process.env.NODE_ENV === 'production') {
    //   this.bot = new TelegramBot(config.telegram.token, { webHook: { port: config.telegram.port, host: config.telegram.host } });
    //   this.bot.setWebHook(`${config.telegram.externalUrl}:433/bot${config.telegram.token}`);
    // } else {
    //   this.bot = new TelegramBot(config.telegram.token, { polling: true });
    // }

    this.bot = new TelegramBot(config.telegram.token, { polling: true });

    this.handleText = this.handleText.bind(this);
  }

  listen() {
    this.bot.on('text', this.handleText);

    return Promise.resolve();
  }

  handleText(message) {
    const commandHandler = new CommandHandler(this.bot, message);
    const command = message.text.split(' ')[0];

    if (validator.isAskingForStats(command)) {
      console.log(`BOT CALLED: ${message.text}`);
      return commandHandler.getStats();
    }

    if (validator.isAskingForHelp(command)) {
      console.log(`BOT CALLED: ${message.text}`);
      return commandHandler.getHelp();
    }

    return null;
  }
}
