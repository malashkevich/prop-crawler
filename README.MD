# Property rent apartment finder in Poland.

This is a simple notifier of the new offers on olx.pl and otodom.pl.
While running, it will check for new offers every minute, and it finds a new one it will send a notification in telegram.

## How to use this gorgeous peace of code:

### Setup environment:

1. Make sure you have node.js and npm installed.
2. Clone the repository.
3. Run `npm install` in the root directory.

### Setup searching urls:
For olx.pl:

1. Open https://www.olx.pl/d/nieruchomosci/mieszkania/
2. Choose city,and set up the filters according to your needs.
3. Copy the url of the page you want to search.
4. Paste it in the `contstants.ts` as a value for variable `urlOLX`.

For example:

```
const urlOLX = 'https://www.olx.pl/nieruchomosci/mieszkania/wynajem/gdansk/?search%5Bfilter_float_price%3Ato%5D=4000&search%5Bfilter_float_price%3Afrom%5D=1400&search%5Bfilter_enum_rooms%5D%5B0%5D=two&search%5Bfilter_enum_rooms%5D%5B1%5D=three&search%5Bfilter_enum_rooms%5D%5B2%5D=four&search%5Bdist%5D=5';'
```

For otodom.pl:

1. Open https://www.otodom.pl/pl/oferty/wynajem/mieszkanie
2. Choose city,and set up the filters according to your needs.
3. Copy the url of the page you want to search.
4. Paste it in the `contstants.ts` as a value for variable `urlOTODOM`.

For example:

```
const urlOTODOM = 'https://www.otodom.pl/pl/oferty/wynajem/mieszkanie/gdansk?distanceRadius=0&page=1&limit=36&market=ALL&ownerTypeSingleSelect=ALL&roomsNumber=%5BTWO%2CTHREE%2CFOUR%5D&isPrivateOwner=true&priceMin=1400&priceMax=4500&daysSinceCreated=3&locations=%5Bcities_6-40%5D&media=%5B%5D&extras=%5B%5D&viewType=listing';
```

### Setup telegram bot:

1. You can create a bot on telegram using the @BotFather bot. It's pretty easy. 
2. Gwt the token of the bot you created by sending a message `/token` to the @BotFather. 
3. Copy the token from the bot and paste it in the `contstants.ts` as a value for variable `bot_key`.

### Setup telegram channel:

1. Create a channel on telegram.
2. Invite the created bot to the channel as administrator.
3. Find @getidsbot and using it get the id of the channel you created.
4. Copy the id of the channel you created and paste it in the `contstants.ts` as a value for variable `chatid`.


### Running the code:

1. Run `npm start` in the root directory.
2. You also can watch the logs in the terminal by using command `tail -f crawler.log`.
3. Do not close the terminal, or the script will stop.

### Advanced usage:
On OSX you can set up a daemon to automatically run the script as your laptop is turned on.
Steps:

1. Create a file named `crawler.plist` in `/Library/LaunchDaemons/` directory:
```
sudo touch /Library/LaunchDaemons/crawler.plist
```

2. Add the following content to the file and save it:

```
<plist version="1.0">
<dict>
    <key>Crawler</key>
    <string>crawler.application</string>

    <key>WorkingDirectory</key>
    <string>/Users/alexei/dev/crawler</string>

    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/node</string>
        <string>PATH_TO_THE_ROOT_FOLDER/index.js</string>
    </array>

    <key>RunAtLoad</key>
    <true/>

    <key>KeepAlive</key>
    <true/>

</dict>
</plist>
```

3. Run `sudo launchctl load /Library/LaunchDaemons/crawler.plist` to start the daemon.
4. Run `sudo launchctl list` to check if the daemon is running.
5. Run `sudo launchctl unload /Library/LaunchDaemons/crawler.plist` to stop the daemon. It will be restarted automatically on next boot.
6. If you want to completely remove the daemon, run `sudo launchctl remove /Library/LaunchDaemons/crawler.plist` or `sudo rm /Library/LaunchDaemons/crawler.plist`.


# Disclaimer:
This script worked for me in the March 2022, but later the markup of olx.pl and otodom.pl could change and the script could stop working.
Use it at your own risk, can't be held responsible for any damage caused by this script. 💁‍♂️
