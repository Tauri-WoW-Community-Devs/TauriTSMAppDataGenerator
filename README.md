# TSM AppData generator (from Tauri API)
This tool allows you to generate `AppData.lua` file for MoP TradeSkillMaster_AuctionDB addon.
This can be either run on local PC or set up on a server to provide an access to up-to date AppData file.

## ENV variables explaination

- `API_KEY` - API Key from this page: https://tauriwow.com/account#amanage/charapi
- `SECRET_KEY` - Secret Key from this page: https://tauriwow.com/account#amanage/charapi
- `OUTPUT_DIR` - absolute path to the location you want to output AppData.lua file to. If you want to run this script locally - set it to the `TradeSkillMaster_AuctionDB` addon directory. 

### OUTPUT_DIR examples

Running on the PC you play WoW:
```dotenv
OUTPUT_DIR="D:\World of Warcraft 5.4.8\Interface\AddOns\TradeSkillMaster_AuctionDB"
```
Running on some server, output to accessible domain directory:
```dotenv
OUTPUT_DIR="/var/www/subdomain.domain.com"
```

## Run & debug
Fill all required .env variables and run `yarn run start` to launch the script.
If you prefer the JS version - run `yarn run build` instead of the start command and use files in `dist` folder.
