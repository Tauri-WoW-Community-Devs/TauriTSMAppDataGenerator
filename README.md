# TSM AppData generator (from Tauri API)
This tool allows you to generate `AppData.lua` file for MoP TradeSkillMaster_AuctionDB addon.

## ENV variables explaination

- `API_KEY` - API Key from this page: https://tauriwow.com/account#amanage/charapi
- `SECRET_KEY` - Secret Key from this page: https://tauriwow.com/account#amanage/charapi
- `STORMFORGE_API_KEY` - API Key from this page: https://stormforge.gg/account#apikey
- `STORMFORGE_SECRET_KEY` - Secret Key from this page: https://stormforge.gg/account#apikey

## Run & debug
Fill all required .env variables and run `yarn run start` to launch the script.
If you prefer the JS version - run `yarn run build` instead of the start command and use files in `dist` folder.

## Docker & You
You can now use Docker to run this script.

Recommended way using docker-compose:

1. Copy `.env` file as `.env.local` and fill all required variables.
2. Run `docker-compose up -d` to start the container.

You can also use `docker run` command to run the container manually.
