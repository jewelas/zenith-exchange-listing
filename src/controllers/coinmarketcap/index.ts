// @ts-nocheck
import axios, {AxiosInstance} from "axios"

class CMCTradeListing {
  summary = async (req, res) => {
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

      // console.time("Summary Response Time");
        await axios
          .all(Links.map((endpoint: string) => axios.get(endpoint)))
          .then(
            axios.spread((...response: any[]) => {
              response.map((res: any) => {
                if (res?.data?.msg == "Invalid symbol") {
                } else {
                  let data = res.data;
                  let obj = {
                    trading_pairs: res.config.url.split("=")[1], //data.trading_pairs,
                    last_price: data.last,
                    lowest_ask: data.sell, // Call another API for this
                    highest_bid: data.buy,
                    base_volume: data.vol,
                    quote_volume: parseFloat(data.vol) * parseFloat(data.last),
                    price_change_percent_24h: data.rose,
                    highest_price_24h: data.high,
                    lowest_price_24h: data.low,
                  };
                  final.push(obj);
                }
              });
            })
          );
      res.status(200).json(final);
      // console.timeEnd("Summary Response Time")
    } catch (error) {
      res.send(error.toString());
    }
  };

  orderbook = async (req, res) => {
    try {
      // console.log(req.params.market_pair);
      if (req.params.market_pair != undefined && req.params.market_pair != "") {
        const response = await axios.get(
          "https://openapi.fuzionx.io/sapi/v1/depth?symbol=" +
            req.params.market_pair
        );
        //   console.log(response.data);
        res.send(response.data);
      } else {
        res.send("market pair is required : market_pair");
      }
    } catch (error) {
      res.send(error.toString());
    }
  };

  assets = async (req, res) => {
    //Find the pair pairs array
    // Get the index
    // Get the corresponding value from fee array
    // Create a JSON object with the pair, fee and Name of all of the coins
    // Return the JSON object
    //
    const pairs = [
      ["ZENITH1634", 0.0018, 0.0018], //Pair, MakerFee, TakerFee
      ["BTC", 0.0018, 0.0018],
      ["ETH", 0.0018, 0.0018],
      ["XRP", 0.28, 0.28],
      ["BNB", 0.0018, 0.0018],
      ["LINK", 0.28, 0.28],
      ["MATIC", 0.28, 0.28],
      ["TRX", 0.28, 0.28],
      ["BSV", 0.28, 0.28],
      ["ATOM", 0.28, 0.28],
      ["LTC", 0.28, 0.28],
      ["ADA", 0.002, 0.002],
      ["BCH", 0.002, 0.002],
      ["SOL", 404, 404],
      ["XTZ", 0.002, 0.002],
      ["KAVE", 404, 404],
      ["AVAX", 0.002, 0.0025],
      ["ETC", 0.002, 0.002],
      ["SHIB", 404, 404],
      ["AAVE", 0.002, 0.0025],
      ["GST", 0.002, 0.002],
      ["BTCP", 404, 404],
      ["WAVES", 0.002, 0.0025],
      ["MANA", 0.0028, 0.0028],
      ["HSHIB", 404, 404],
      ["DOGE", 0.002, 0.002],
      ["XLM", 0.002, 0.002],
      ["POMG", 404, 404],
      ["LNG", 404, 404],
      ["XIT", 404, 404],
      ["PY", 404, 404],
      ["USDI", 0.002, 0.0025],
      ["ECELL", 404, 404],
      ["QAS", 404, 404],
      ["COM", 404, 404],
      ["COR", 404, 404],
      ["ICP", 0.002, 0.0025],
      ["ACH", 404, 404],
      ["DKT", 0.002, 0.002],
      ["XMR", 0.002, 0.002],
      ["GMT", 0.002, 0.002],
      ["APE", 0.002, 0.002],
      ["BRK", 0.002, 0.002],
      ["CPLAY", 0.002, 0.002],
      ["CRPT", 0.002, 0.002],
      ["OKB", 0.28, 0.28],
      ["EOS", 0.002, 0.002],
      ["PRX", 404, 404],
      ["NORD", 0.0025, 0.0025],
      ["STG", 0.0025, 0.0025],
      ["PKN", 0.002, 0.002],
      ["LBP", 0.002, 0.002],
      ["COCOS", 404, 404],
      ["RACA", 0.002, 0.002],
      ["ASVA", 0.002, 0.002],
      ["JASMY", 0.002, 0.002],
      ["DOSE", 0.002, 0.002],
      ["ROSE", 0.002, 0.002],
      ["MGT", 404, 404],
      ["STRM", 0.002, 0.002],
      ["GAL", 0.002, 0.002],
      ["FAME", 0.002, 0.002],
      ["FXS", 0.002, 0.002],
      ["LUNR", 0.002, 0.002],
      ["FGD", 0.002, 0.002],
      ["QFL", 0.25, 0.25],
      ["DKS", 0.28, 0.28],
      ["DASH", 0.28, 0.28],
      ["VET", 0.28, 0.28],
      ["SNT", 0.28, 0.28],
      ["HT", 0.28, 0.28],
      ["ZRX", 0.28, 0.28],
      ["IOTX", 404, 404],
      ["FIL", 404, 404],
      ["WAN", 0.28, 0.28],
      ["TRXV", 0.002, 0.002],
      ["MLB", 0.001, 0.001],
      ["LUNA", 404, 404],
      ["SUSHI", 404, 404],
      ["BABY", 404, 404],
      ["ONC", 404, 404],
      ["LOWB", 0.001, 0.001],
      ["SRT", 0.28, 0.28],
      ["SAND", 0.28, 0.28],
      ["SKL", 0.28, 0.28],
      ["CRV", 0.28, 0.28],
      ["UNI", 0.28, 0.28],
      ["MITH", 0.28, 0.28],
      ["FLOW", 0.28, 0.28],
      ["EGT", 0.28, 0.28],
      ["ZEN", 0.28, 0.28],
      ["CRO", 0.28, 0.28],
      ["UNFI", 0.28, 0.28],
      ["FIT", 404, 404],
      ["LRC", 0.28, 0.28],
    ];
    let marketPairs = {};
    
    for (let i = 0; i < pairs.length; i++) {
      if (pairs[i][1] != 404) {
        marketPairs[`${pairs[i][0]}`] = {
          can_withdraw: "true",
          can_deposit: "true",
          maker_fee: pairs[i][1],
          taker_fee: pairs[i][2],
        };
      } else {
      }
    }
    res.send(marketPairs);
  };

  trades_marketpair = async (req, res) => {
    // console.log(req.params.market_pair);
    try {
      let final = [];
      const response = await axios.get(
        "https://openapi.fuzionx.io/sapi/v1/trades?symbol=" +
          req.params.market_pair
      );
      // console.log(response.data);
      const data = response.data.list;
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        let obj = {
          trade_id: data[i].id,
          price: data[i].price,
          base_volume: data[i].qty,
          quote_volume: parseFloat(data[i].price) * parseFloat(data[i].qty),
          timestamp: data[i].time,
          type: data[i].side,
        };

        //   console.log(data);
        final[i] = obj;
      }
      res.send(final);
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

      //Batch Requesting in porgress for first 25
      let obj = {};
      // console.time("Tickers Response Time");
        await axios
          .all(Links.map((endpoint: string) => axios.get(endpoint)))
          .then(
            axios.spread((...response: any[]) => {
              response.map((res: any) => {
                if (res?.data?.msg == "Invalid symbol") {
                } else {
                  let pair = res.config.url.split("=")[1];
                  const data = res?.data;
                  obj[pair] = {
                    last_price: data.last,
                    base_volume: data.vol,
                    quote_volume: parseFloat(data.vol) * parseFloat(data.last),
                  };
                }
              });
            })
          );
      res.send(obj);
      // console.timeEnd("Tickers Response Time");
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

export default new CMCTradeListing();
