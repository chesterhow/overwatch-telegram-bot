# overwatch-telegram-bot
A bot for retrieving players' stats for the game Overwatch via [Telegram](https://telegram.org/).

## Getting Started
To get started, you can either message the bot directly, or add the bot to your group chat.

[@ow_stats_bot](https://telegram.me/ow_stats_bot)

## Usage
To retrieve stats, send a message in this format: `<Command> <Username>-<Battle ID>`

#### Example
I want to get statistics for the player **LastBastian#12345**. So, I will message the bot with
```
/overallstats LastBastian-12345
```

The bot will then call the API to search and reply with
```
Hold on while I search for LastBastian-12345
```

Once a response has been received, the bot will reply with the relevant statistics
```
LastBastian-12345's Overall Stats (Quick Play):
  - Level: 101
  - Games: 934
  - Wins: 578
  - Losses: 356
  - Win Rate: 61.88%
  - Rating: 67
```

## Commands
These are the list commands currently recognised by the bot

#### Quick Play
```
/overallstats
/averagestats
/beststats
```

#### Competitive
```
/overallstats_comp
/averagestats_comp
/beststats_comp
```

#### Miscellaneous
```
/help
```

## Thanks
Thanks to SunDwarf and all who contributed to the awesome [Overwatch API](https://github.com/SunDwarf/OWAPI).

## License
See [LICENSE](https://github.com/chesterhow/overwatch-telegram-bot/blob/master/LICENSE)
