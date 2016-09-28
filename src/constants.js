export const API_URL = 'https://owapi.net/api/v3/u';
export const BOT_USERNAME = '@ow_stats_bot';
export const HTTP_HEADERS = { 'Content-Type': 'application/json' };

// sendMessage options
export const REPLY_MARKUP = {
  reply_markup: {
    keyboard: [],
    selective: true,
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};

export const PARSE_MODE = { parse_mode: 'Markdown' };
