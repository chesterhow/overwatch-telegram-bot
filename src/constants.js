export const API_URL = 'https://owapi.net/api/v3/u';
export const BOT_USERNAME = '@ow_stats_bot';
export const HTTP_HEADERS = { 'Content-Type': 'application/json' };

// sendMessage options
export const REPLY_MARKUP_KEYBOARD = {
  reply_markup: {
    keyboard: [],
    selective: true,
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};

export const REPLY_MARKUP_HIDE_KEYBOARD = {
  reply_markup: {
    selective: true,
    hide_keyboard: true,
  },
};

export const REPLY_MARKUP_INLINE_KEYBOARD = {
  reply_markup: {
    inline_keyboard: [],
  },
};

export const PARSE_MODE = { parse_mode: 'Markdown' };

export const PLAYOVERWATCH_URL = 'https://playoverwatch.com/en-us/career';
export const MASTEROVERWATCH_URL = 'http://masteroverwatch.com/profile';
