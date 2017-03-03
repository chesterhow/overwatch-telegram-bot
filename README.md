# overwatch-telegram-bot
A bot for retrieving players' stats for the game Overwatch via [Telegram](https://telegram.org/).

## Getting Started
To get started, you can either message [@OverwotBot](https://t.me/OverwotBot) directly, or add the bot to your group chat.

## Usage
To retrieve stats, send a message in this format: `/stats <Battle Tag> <Region>`

If the player you're searching for is in the America (`us`) server you can leave out the region. If the player is Europe or Korea, simply type `eu` or `kr` in the region section.

#### Example
We want to get statistics for the player **Seagull#1894**. So, we'll message the bot with

_Seagull from US server_
```
/stats Seagull#1894
```

_Seagull from EU server_
```
/stats Seagull#1894 eu
```

The bot will then call the API to search for the player. This might take awhile so don't worry if you don't get a reply instantly.

Once the player is found, we'll be prompted to choose a game mode
<p align="center">
  <img src="http://i.imgur.com/DxO2RTI.png" alt="Game mode keyboard" width="350px" />
</p>

Next, we'll be prompted to choose which stats to view
<p align="center">
  <img src="http://i.imgur.com/sp7KgLy.png" alt="Stats keyboard" width="350px" />
</p>

Finally, the bot will reply with the relevant stats
<p align="center">
  <img src="http://i.imgur.com/Ug5lQOt.png" alt="Bot's reply" width="350px" />
</p>

## Commands
These are the list commands currently recognised by the bot

```
/stats
/links
/help
```

## Thanks
Thanks to SunDwarf and all who contributed to the awesome [Overwatch API](https://github.com/SunDwarf/OWAPI).

## License
See [LICENSE](https://github.com/chesterhow/overwatch-telegram-bot/blob/master/LICENSE)
