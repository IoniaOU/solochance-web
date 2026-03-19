# SoloChance.org

Free solo mining chance calculator. The only calculator supporting Bitcoin Cash, Bitcoin SV and eCash — plus Bitcoin, Monero, Dogecoin and 15+ more.

**https://solochance.org**

## Features

- Calculate the probability of finding a block when solo mining
- 18 supported cryptocurrencies (BTC, BCH, BSV, XEC, LTC, DOGE, XMR, ETC, ZEC and more)
- Live network data and real-time price feeds
- Embeddable widget for product pages
- Public API
- Classic and Sci-Fi themed interfaces

## API

```
curl 'https://api.solochance.org/getSoloChanceCalculations?currency=BTC&hashrate=42&hashrateUnit=TH'
```

### Parameters

| Parameter | Values |
|---|---|
| `currency` | `BTC`, `BCH`, `BSV`, `XEC`, `DGB`, `AUR`, `PPC`, `LCC`, `LTC`, `DOGE`, `XMR`, `RVN`, `ETC`, `BTCS`, `BC2`, `SC`, `ZEC`, `tBTC` |
| `hashrate` | Any positive number |
| `hashrateUnit` | `KH`, `MH`, `GH`, `TH`, `PH`, `EH` |

## Tech Stack

- Static HTML/CSS/JS — no build step, no framework
- Hosted via GitHub Pages
- API served from `api.solochance.org`

## License

[GNU Affero General Public License v3.0](LICENSE)
