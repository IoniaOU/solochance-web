// ── Cached DOM references ─────────────────────────────────────────────────
const el = {
    currency:       document.getElementById('selectCurrency'),
    hashrateUnit:   document.getElementById('selectHashrateUnit'),
    hashrate:       document.getElementById('inputHashrate'),
    calcBtn:        document.getElementById('calculate-btn'),
    coffeeDonate:   document.getElementById('coffee-donate'),
    bchDonate:      document.getElementById('bch-donate'),
    xecDonate:      document.getElementById('xec-donate'),
    yourHashrate:   document.getElementById('your-hashrate'),
    networkHashrate:document.getElementById('network-hashrate'),
    blockInterval:  document.getElementById('block-interval'),
    price:          document.getElementById('price'),
    blockReward:    document.getElementById('block-reward'),
    blockRewardUsd: document.getElementById('block-reward-usd'),
    chanceBlock:    document.getElementById('chance-per-block'),
    chanceHour:     document.getElementById('chance-per-hour'),
    chanceDay:      document.getElementById('chance-per-day'),
    chanceWeek:     document.getElementById('chance-per-week'),
    chanceMonth:    document.getElementById('chance-per-month'),
    chanceYear:     document.getElementById('chance-per-year'),
    halvingRow:     document.getElementById('halving-row'),
    halvingChance:  document.getElementById('chance-by-halving'),
    lastBlockRow:   document.getElementById('last-mining-reward-block-row'),
    lastBlockRow2:  document.getElementById('last-mining-reward-block-row2'),
    lastBlockChance:document.getElementById('chance-by-last-block'),
};

// ── Helpers ───────────────────────────────────────────────────────────────
function formatUSD(value) {
    return Number(value).toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' USD';
}

function setConditionalRow(row, footnote, cell, text) {
    const hasText = text.trim() !== '';
    cell.textContent = hasText ? text : '';
    row.style.display = hasText ? '' : 'none';
    if (footnote) {
        hasText
            ? footnote.style.removeProperty('display')
            : footnote.style.setProperty('display', 'none', 'important');
    }
}

// ── Currency change ───────────────────────────────────────────────────────
function changeCurrency() {
    const currency = el.currency.value;
    const isBCH = currency === 'BCH';
    const isXEC = currency === 'XEC';

    el.bchDonate.style.display = isBCH ? '' : 'none';
    el.xecDonate.style.display = isXEC ? '' : 'none';
    el.coffeeDonate.style.display = (isBCH || isXEC) ? '' : 'none';
}

// ── Calculate ─────────────────────────────────────────────────────────────
async function calculateHashrate() {
    const currency    = el.currency.value;
    const hashrateUnit = el.hashrateUnit.value;
    const hashrate    = el.hashrate.value;

    const apiUrl = `https://api.solochance.org/getSoloChanceCalculations?currency=${currency}&hashrate=${hashrate}&hashrateUnit=${hashrateUnit}`;

    el.calcBtn.disabled = true;
    el.calcBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Calculating...';

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const data = await response.json();

        el.yourHashrate.textContent    = data.currentHashrateText;
        el.networkHashrate.textContent = data.networkHashrateText;
        el.blockInterval.textContent   = data.blockIntervalInMinutes + ' minutes';
        el.price.textContent           = formatUSD(data.price);
        el.blockReward.textContent     = data.blockReward + ' ' + currency;
        el.blockRewardUsd.textContent  = formatUSD(data.blockRewardInUSD);
        el.chanceBlock.textContent     = data.blockChanceText;
        el.chanceHour.textContent      = data.hourChanceText;
        el.chanceDay.textContent       = data.dayChanceText;
        el.chanceWeek.textContent      = data.weekChanceText;
        el.chanceMonth.textContent     = data.monthChanceText;
        el.chanceYear.textContent      = data.yearChanceText;

        setConditionalRow(
            el.halvingRow, null, el.halvingChance,
            (data.untilNextHalvingChanceText ?? '').toString()
        );

        setConditionalRow(
            el.lastBlockRow, el.lastBlockRow2, el.lastBlockChance,
            (data.untilLastMiningRewardBlockChanceText ?? '').toString()
        );

    } catch (error) {
        console.error('Calculation failed:', error);
        alert('Could not fetch data. Please check your connection and try again.');
    } finally {
        el.calcBtn.disabled = false;
        el.calcBtn.innerHTML = 'Calculate';
    }
}

// ── Enter key support ─────────────────────────────────────────────────────
el.hashrate.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        calculateHashrate();
    }
});
