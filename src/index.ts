import express from 'express';
import cors from 'cors';
const app = express()
const port = 3000

import coingecko from './controllers/coingecko/index';
import coinmarketcap from './controllers/coinmarketcap/index';
import nomics from "./controllers/nomics/index"
import apicache from 'apicache'

let cache = apicache.middleware
app.use(cache('10 seconds'))
app.use(express.json())
app.use(cors())

//@ts-ignore
app.get('/', (req, res)=>{
  res.send("Hello new world");
});


//                          CoinGecko 
// SPOT Endpoints
app.get('/coingecko/pairs', coingecko.pairs);
app.get('/coingecko/tickers', coingecko.tickers);
app.get('/coingecko/orderbook', coingecko.orderbook);
app.get('/coingecko/historical_trades', coingecko.historical_trades);

// Derivative Endpoints
app.get('/coingecko/contracts', coingecko.contracts);
app.get('/coingecko/contract_specs', coingecko.contract_specs);
app.get('/coingecko/orderbook_detail', coingecko.orderbook_detail);
app.get('/coingecko/circulatingsupply', coingecko.circulatingsupply);
app.get('/coingecko/totalsupply', coingecko.totalsupply);

//                          Nomics
app.get('/info', nomics.info);
app.get('/trades', nomics.historical_trades); //?market=BTCUSDT&since=12345678
app.get('/markets', nomics.markets); 
app.get('/orders/snapshot', nomics.orders_snapshot) //?market=BTCUSDT
app.get('/ticker', nomics.tickers); // This endpoint is failed in Audit
// app.get('/orders/snapshot', nomics.orders_snapshot)


// //                          Coin Market Cap
app.get('/cmc/summary', coinmarketcap.summary); // working
app.get('/cmc/orderbook/:market_pair', coinmarketcap.orderbook); // Working
app.get('/cmc/trades/:market_pair', coinmarketcap.trades_marketpair); // Working
app.get('/cmc/ticker', coinmarketcap.tickers); // 
app.get('/cmc/assets', coinmarketcap.assets); 














app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
