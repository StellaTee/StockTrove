# StockTrove

CS261 Project

Prerequises:
Have node installed
have python installed

How to operate

open a new terminal
cd stock-trove
npm i
pip install -r requirements.txt

open a new terminal
cd stock-trove
node app.cjs

open a new terminal
cd stock-trove
npm run dev

Api keys
Since we are using demo api keys, goperigon key runs out after 150 requests, therefore we need to keep replacing the api key.
If the application stops functioning its most likely because we hit the api request limit, to replace the api key: go into goperigonapiclient.ts and comment the current api key and uncomment a future one. Two extra api keys will be provided for testing purposes.
