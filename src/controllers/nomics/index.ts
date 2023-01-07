import axios from "axios";
import { Request, Response } from "express";

class NomicsTradeListing {
  orders_snapshot = async (req: Request, res: Response) => {
    try {
      const response = await axios.get(
        "https://openapi.fuzionx.io/sapi/v1/depth?symbol=" + req.query.market
      );
      const date = new Date(Date.now());
        // console.log(response.data.time);
        let obj = {
          bids : response.data.bids,
          asks : response.data.asks, 
          timestamp : date.toISOString()
        }
      res.send(obj);
    } catch (error: any) {
      res.send(error.toString());
    }
  };

  info = async (req: Request, res: Response) => {
    try {
      res.send({
        name: "FuzionX",
        description:
          "FuzionX by Zenith Chain was built with the conviction that there is an urgent market need for a simplified and inclusive Defi-Cefi ecosystem as opposed to the current fragmentation which proves to be cumbersome to users. The FuzionX Exchange is a REGULATED EXCHANGE PLATFORM that addresses key challenges including security, liquidity, fiat to crypto transactions and vice versa, and more. It is Multi-dimensional :Combining crypto trading platform with crypto wallets, NFTs and Dapp access. User Security & Screening : A robust screening process before coin listing with industry-leading security to safeguard crypto investments and assets. Reasonable service fees  : Transparent fee structure with no hidden charges.  Excellent customer support : Easier and faster cash-out options with multi-lingual support and dedicated customer support team. FUZIONX Eco system has Zenith Chain An affordable blockchain solution that offers speed and security while maintaining a near-zero fee for transactions. Fuzionx Exchange : A CEX and DEX crypto trading experience with real-time market data, advanced charting tools and margin trading. NFT Marketplace: Buy, rent, sell and create exciting NFTs Dapp Access : Trade and invest on multiple DeFi platforms without switching apps. Fuzionx Pay Wallet : For quick merchant payments using our unique Fuzionx Global debit card.",
        location: "Lithuania",
        logo: "https://www.fuzionx.io/img/logo.b359a18d.png",
        website: "https://www.fuzionx.io/en_US/",
        twitter: "https://twitter.com/FuzionX_io",
        version: "1.0",
        capability: {
          markets: true,
          trades: true,
          ordersSnapshot: true,
          candles: false,
          ticker: false,
        },
      });
    } catch (error: any) {
      res.send(error.toString());
    }
  };
  // orderbook = async (req: Request, res: Response) => {
  //   try {
  //     console.log(req.query.market
  //       );
  //   const response = await axios.get(
  //       "https://openapi.fuzionx.io/sapi/v1/depth?symbol="+req.query.market
  //     );
  //     console.log(response.data);
  //     res.send(
  //      response.data
  //     );
  //   } catch (error) {
  //       res.send(error.toString());
  //   }
      
  
  
  // }

  historical_trades = async (req: Request, res: Response) => {
    try {
      // since is avialable
      if (req.query.since != undefined) {
        let final: Array<any> = [];
        const response = await axios.get(
          "https://openapi.fuzionx.io/sapi/v1/trades?symbol=" + req.query.market
        );

        const data = response.data.list;
        for (let i = 0; i < data.length; i++) {
          //@ts-ignore
          if(data[i].id == (parseInt(req.query.since)-1))
          {
            const date = new Date(data[i]?.time);
            let obj = {
              id: data[i]?.id.toString(),
              timestamp: date.toISOString(),
              price: data[i]?.price,
              amount: data[i]?.qty,
              side: data[i]?.side.toLowerCase(),
            };
            final.push(obj);
          }
          if (req.query.since != undefined && data[i].id > req.query.since) {
            const date = new Date(data[i]?.time);
            let obj = {
              id: data[i]?.id.toString(),
              timestamp: date.toISOString(),
              price: data[i]?.price,
              amount: data[i]?.qty,
              side: data[i]?.side.toLowerCase(),
            };
            final.push(obj);
          }
        }
        if (final.length < 1) {
          let obj = [
            {
              id: "",
              timestamp: "",
              price: "",
              amount: "",
              side: "",
            },
            {
              id: "",
              timestamp: "",
              price: "",
              amount: "",
              side: "",
            },
          ];
          res.json(obj);
        } else {
          res.json(final);
        }
      } else {
        let final: Array<any> = [];
        const response = await axios.get(
          "https://openapi.fuzionx.io/sapi/v1/trades?symbol=" + req.query.market
        );
        // console.log("abc")

        const data = response.data.list;
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
          const date = new Date(data[i]?.time);
          // console.log("Time : "+date.toISOString());
          // if(req.query.since != undefined && data[i].id > req.query.since)
          // {
          let obj = {
            id: data[i].id.toString(),
            timestamp: date.toISOString(),
            price: data[i].price,
            amount: data[i].qty,
            side: data[i].side.toLowerCase(),
          };

          final.push(obj);
        }
        res.send(final);
      }
    } catch (error) {}
  };

  markets = async (req: Request, res: Response) => {
    try {
      let final: Array<any> = [];
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
      const Links = getURIMarkets(URL, pairs, basesPairs);

      await axios
          .all(Links.map((endpoint: any) => axios.get(endpoint)))
          .then(
            axios.spread((...response: any[]) => {
              response.map((res: any) => {
                if (res?.data?.msg == "Invalid symbol") {
                } else {
                  if ((res.config.url).includes("USDT")) {
                    let base = (res.config.url.split("=")[1]).split("USDT")[0]
                    console.log(base)
                    let obj = {
                      id: res.config.url.split("=")[1],
                      type: "spot",
                      base: base,
                      quote: "USDT",
                      active: true,
                      market_url:
                        "https://www.fuzionx.io/en_US/newTrade/" +base+"_USDT"
                    };
                    final.push(obj);
                  } 
                  else if (res.config.url.includes("USDC")) {
                    let base = (res.config.url.split("=")[1]).split("USDC")[0]
                    console.log(base)
                    let obj = {
                      id: res.config.url.split("=")[1],
                      type: "spot",
                      base: base,
                      quote: "USDC",
                      active: true,
                      market_url:
                        "https://www.fuzionx.io/en_US/newTrade/" +base+"_USDC"
                    };
                    final.push(obj);
                  } else if (res.config.url.includes("USD")) {
                    let base = (res.config.url.split("=")[1]).split("USD")[0]
                    console.log(base)
                    let obj = {
                      id: res.config.url.split("=")[1],
                      type: "spot",
                      base: base,
                      quote: "USD",
                      active: true,
                      market_url:
                        "https://www.fuzionx.io/en_US/newTrade/" +base+"_USD"
                    } 
                    final.push(obj);
                  } else if (res.config.url.includes("BTC")) {
                    let base = (res.config.url.split("=")[1]).split("BTC")[0]
                    console.log(base)
                    let obj = {
                      id: res.config.url.split("=")[1],
                      type: "spot",
                      base: base,
                      quote: "BTC",
                      active: true,
                      market_url:
                        "https://www.fuzionx.io/en_US/newTrade/" +base+"_BTC"
                    };
                    final.push(obj);
                  } else if(res.config.url.includes("ETH")){
                    let base = (res.config.url.split("=")[1]).split("ETH")[0];
                    console.log(base)
                    let obj = {
                      id: res.config.url.split("=")[1],
                      type: "spot",
                      base: base,
                      quote: "ETH",
                      active: true,
                      market_url:
                        "https://www.fuzionx.io/en_US/newTrade/" +base+"_ETH"
                    };
                    final.push(obj);
                  }
                }
              });
            })
          );
      res.send(final);
    } catch (error: any) {
      res.send(error.toString());
    }
  };

  tickers = async (req: Request, res: Response) => {
    try {
      let final: Array<any> = [];
      const response = await axios.get(
        "https://openapi.fuzionx.io/sapi/v1/ticker?symbol=" + req.query.market);

      if (response?.data?.msg == "Invalid symbol") {
        res.json({
          close: "1",
          timestamp: new Date().toISOString(),
          raw: [],
        });
      } else {
        res.json({
          close: "1",
          timestamp: new Date().toISOString(),
          raw: [],
          volume: response.data.vol,
        });
      }
      // res.send(final);
    } catch (error: any) {
      res.json({
        error: error.toString()
      })
    }
  };
}
function getURIMarkets(url: string, coin: Array<string>, baseCoin: Array<string>) {
  let URLs:Array<String> = [];
  for (let i = 0; i < coin.length; i++) {
    for (let j = 0; j < baseCoin.length; j++) {
      URLs.push(url + coin[i] + baseCoin[j]);
    }
  }
  return URLs
}


export default new NomicsTradeListing();
