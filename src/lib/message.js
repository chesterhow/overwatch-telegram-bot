export default class Message {
  constructor(msg) {
    this.from = msg.from;
    this.text = msg.text;
    this.user = msg.user;
    this.chat = msg.chat;
  }

  static mapMessage(msg) {
    return {
      from: msg.from.id,
      text: msg.text,
      chat: {
        id: msg.chat.id,
      },
      user: {
        firstName: msg.from.first_name,
        lastName: msg.from.last_name,
      }
    };
  }
}
