// @ts-nocheck
const axios = require("axios");

class CoingeckoTradeListing {
  pairs = async (req, res) => {
    try {
      let final = [];
      const response = await axios.get(
        "https://openapi.fuzionx.io/sapi/v1/symbols"
      );
      let data = response.data.symbols;
      for (let i in data) {
        let obj = {
          ticker_id: data[i].symbol,
          base: data[i].baseAsset,
          target: data[i].quoteAsset,
        };
        final.push(obj);
      }
      res.send({ symbols: final });
    } catch (error) {
      res.send(error.toString());
    }
  };

  tickers = async (req, res) => {
    try {
      let final = [];
      const pairs = [
        "ZENITH1634",
        "BTC",
        "ETH",
        "XRP",
        "BNB",
        "LINK",
        "MATIC",
        "TRX",
        "BSV",
        "ATOM",
        "LTC",
        "ADA",
        "BCH",
        "SOL",
        "XTZ",
        "KAVE",
        "AVAX",
        "ETC",
        "SHIB",
        "AAVE",
        "GST",
        "BTCP",
        "WAVES",
        "MANA",
        "HSHIB",
        "DOGE",
        "XLM",
        "POMG",
        "LNG",
        "XIT",
        "PY",
        "USDI",
        "ECELL",
        "QAS",
        "COM",
        "COR",
        "ICP",
        "ACH",
        "DKT",
        "XMR",
        "GMT",
        "APE",
        "BRK",
        "CPLAY",
        "CRPT",
        "OKB",
        "EOS",
        "PRX",
        "NORD",
        "STG",
        "PKN",
        "LBP",
        "COCOS",
        "RACA",
        "ASVA",
        "JASMY",
        "DOSE",
        "ROSE",
        "MGT",
        "STRM",
        "GAL",
        "FAME",
        "FXS",
        "LUNR",
        "FGD",
        "QFL",
        "DKS",
        "DASH",
        "VET",
        "SNT",
        "HT",
        "ZRX",
        "IOTX",
        "FIL",
        "WAN",
        "TRXV",
        "MLB",
        "LUNA",
        "SUSHI",
        "BABY",
        "ONC",
        "LOWB",
        "SRT",
        "SAND",
        "SKL",
        "CRV",
        "UNI",
        "MITH",
        "FLOW",
        "EGT",
        "ZEN",
        "CRO",
        "UNFI",
        "FIT",
        "LRC",
      ];
      const basesPairs = ["USDT", "USDC", "BTC", "ETH", "USD"];
      const URL = "https://openapi.fuzionx.io/sapi/v1/ticker?symbol=";
      const Links = getURI(URL, pairs, basesPairs);

      await axios
      .all(Links.map((endpoint: string) => axios.get(endpoint)))
      .then(
        axios.spread((...response: any[]) => {
          response.map((res: any) => {
            if (res?.data?.msg == "Invalid symbol") {
            } else {
              let pair = res.config.url.split("=")[1];
              const data = res?.data;
              if (pair.includes("USDT")){
                let obj = {
                ticker_id: pair, //data.trading_pairs,
                base_currency: pair.split("USDT")[0],
                target_currency: "USDT",
                last_price: data.last,
                base_volume: data.vol,
                target_volume: parseFloat(data.vol) * parseFloat(data.last),
                bid: data.buy,
                ask: data.sell,
                high: data.high,
                low: data.low
                }
                final.push(obj)
              }else if (pair.includes("USDC")){
                let obj = {
                ticker_id: pair, //data.trading_pairs,
                base_currency: pair.split("USDC")[0],
                target_currency: "USDC",
                last_price: data.last,
                base_volume: data.vol,
                target_volume: parseFloat(data.vol) * parseFloat(data.last),
                bid: data.buy,
                ask: data.sell,
                high: data.high,
                low: data.low
                }
                final.push(obj)
              }else if (pair.includes("USD")){
                let obj = {
                ticker_id: pair, //data.trading_pairs,
                base_currency: pair.split("USD")[0],
                target_currency: "USD",
                last_price: data.last,
                base_volume: data.vol,
                target_volume: parseFloat(data.vol) * parseFloat(data.last),
                bid: data.buy,
                ask: data.sell,
                high: data.high,
                low: data.low
                }
                final.push(obj)
              }else if (pair.includes("BTC")){
                let obj = {
                ticker_id: pair, //data.trading_pairs,
                base_currency: pair.split("BTC")[0],
                target_currency: "BTC",
                last_price: data.last,
                base_volume: data.vol,
                target_volume: parseFloat(data.vol) * parseFloat(data.last),
                bid: data.buy,
                ask: data.sell,
                high: data.high,
                low: data.low
                }
                final.push(obj)
              }else if (pair.includes("ETH")){
                let obj = {
                ticker_id: pair, //data.trading_pairs,
                base_currency: pair.split("ETH")[0],
                target_currency: "ETH",
                last_price: data.last,
                base_volume: data.vol,
                target_volume: parseFloat(data.vol) * parseFloat(data.last),
                bid: data.buy,
                ask: data.sell,
                high: data.high,
                low: data.low
                }
                final.push(obj)
              }
            }
          });
        })
      );
  res.send(final);
    } catch (error) {
      res.send(error.toString());
    }

    // console.log(final);
  };

  orderbook = async (req, res) => {
    try {
      let id = req.query.ticker_id.split("_");
      const response = await axios.get(
        "https://openapi.fuzionx.io/sapi/v1/depth?symbol=" + id[0] + id[1]
      );
      let data = response.data;
      console.log(data);
      let obj = {
        ticker_id: req.query.ticker_id,
        timestamp: data.time != null ? data.time : Date.now(),
        bids: data.bids,
        asks: data.asks,
      };
      res.send(obj);
    } catch (error) {
      res.send(error.toString());
    }
  };

  historical_trades = async (req, res) => {
    try {
      let Buy = []; let Sell = [];
      let ticker_id = req.query.ticker_id.split("_")
      const response = await axios.get(
        "https://openapi.fuzionx.io/sapi/v1/trades?symbol=" +
        ticker_id[0]+ticker_id[1]
      );
      let data = response.data.list
      console.log(data)
      for (let i in data) {
        if (data[i].side == "BUY") {
          let obj = { 
            trade_id: data[i].id,
            price: data[i].price,
            base_volume: data[i].qty,
            target_volume: parseFloat(data[i].price) * parseFloat(data[i].qty),
            trade_timestamp: data[i].time,
            type: data[i].side,
          };
          Buy.push(obj)
        } else if (data[i].side == "SELL") {
          let obj = {
            trade_id: data[i].id,
            price: data[i].price,
            base_volume: data[i].qty,
            target_volume: parseFloat(data[i].price) * parseFloat(data[i].qty),
            trade_timestamp: data[i].time,
            type: data[i].side
          };
          Sell.push(obj)
        }
      }
      res.send({buy: Buy, sell: Sell});
    } catch (error) {
      res.send(error.toString());
    }
  };

  contracts = async (req, res) => {
    try {
      const response = await axios.get(
        "https://public-api.stormgain.com/api/v1/cg/derivatives/contracts"
      );
      res.send(response.data);
    } catch (error) {
      res.send(error.toString());
    }
  };

  contract_specs = async (req, res) => {
    try {
      const response = await axios.get(
        "https://public-api.stormgain.com/api/v1/cg/derivatives/contracts"
      );
      res.send({
        result: response.data.filter(
          (x) =>
            x.contract_type == req.query.contract_type &&
            x.contract_price == req.query.contract_price &&
            x.contract_price_currency == req.query.contract_price_currency
        ),
      });
    } catch (error) {
      res.send(error.toString());
    }
  };

  orderbook_detail = async (req, res) => {
    try {
      console.log(req.query.symbol);
      const response = await axios.get(
        `https://ftx.com/api/markets/${req.query.symbol}/orderbook?&bids=${req.query.bids}&asks=${req.query.asks}`
      );
      console.log(response.data);
      res.send({
        result: response.data,
      });
    } catch (error) {
      res.send(error.toString());
    }
  };

  circulatingsupply = async (req, res) => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/zenith-chain"
      );
      res.send({
        circulating_supply: response.data.market_data.circulating_supply,
      });
    } catch (error) {
      res.send(error.toString());
    }
  };

  totalsupply = async (req, res) => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/zenith-chain"
      );
      console.log(response.data.market_data);
      res.send({ totalsupply: response.data.market_data.total_supply });
    } catch (error) {
      res.send(error.toString());
    }
  };
}

function getURI(url: string, coin: Array<string>, baseCoin: Array<string>) {
  let URLs = [];
  for (let i = 0; i < coin.length; i++) {
    for (let j = 0; j < baseCoin.length; j++) {
      URLs.push(url + coin[i] + baseCoin[j]);
    }
  }
  return URLs
}

export default new CoingeckoTradeListing();
