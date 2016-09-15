import TelegramBot from 'node-telegram-bot-api';
import Message from './message';
import config from '../config';
import Validator from './validator';
import handlers from '../handlers';

const validator = new Validator();

export default class Messenger {
  constructor() {
    //TODO: Figure out webhooks

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

  handleText(msg) {
    const message = new Message(Message.mapMessage(msg));
    console.log(`BOT CALLED: ${message.text}`);
    const command = message.text.split(' ')[0];

    if (validator.isAskingForOverallStats(command)) {
      return handlers.command.getOverallStats(message, this.bot);
    }

    if (validator.isAskingForAverageStats(command)) {
      return handlers.command.getAverageStats(message, this.bot);
    }

    if (validator.isAskingForBestStats(command)) {
      return handlers.command.getBestStats(message, this.bot);
    }

    if (validator.isAskingForMostPlayed(command)) {
      return handlers.command.getMostPlayed(message, this.bot);
    }

    if (validator.isAskingForHelp(command)) {
      return handlers.command.getHelp(message, this.bot);
    }

    return null;
  }
}
