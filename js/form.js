async function calculateHashrate() {
    const currency = document.getElementById('selectCurrency').value;
    const hashrateUnit = document.getElementById('selectHashrateUnit').value;
    const hashrate = document.getElementById('inputHashrate').value;

    const apiUrl = `https://api.solochance.org/getSoloChanceCalculations?currency=${currency}&hashrate=${hashrate}&hashrateUnit=${hashrateUnit}`;

    const calcBtn = document.getElementById('calculate-btn');

    try {
        // 🔄 turn button into a loading button
        calcBtn.disabled = true;
        calcBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Calculating...';

        const response = await fetch(apiUrl);
        const data = await response.json();

        const yourHashrateContainer = document.getElementById('your-hashrate');
        yourHashrateContainer.innerHTML = data['currentHashrateText'];

        const networkHashrateContainer = document.getElementById('network-hashrate');
        networkHashrateContainer.innerHTML = data['networkHashrateText'];

        const blockIntervalContainer = document.getElementById('block-interval');
        blockIntervalContainer.innerHTML = data['blockIntervalInMinutes'] + ' minutes';

        const blockChance = document.getElementById('chance-per-block');
        blockChance.innerHTML = data['blockChanceText'];

        const hourChance = document.getElementById('chance-per-hour');
        hourChance.innerHTML = data['hourChanceText'];

        const dayChance = document.getElementById('chance-per-day');
        dayChance.innerHTML = data['dayChanceText'];

        const weekChance = document.getElementById('chance-per-week');
        weekChance.innerHTML = data['weekChanceText'];

        const monthChance = document.getElementById('chance-per-month');
        monthChance.innerHTML = data['monthChanceText'];

        const yearChance = document.getElementById('chance-per-year');
        yearChance.innerHTML = data['yearChanceText'];

        // ---- halving visibility logic ----
        const halvingRow = document.getElementById('halving-row');
        const halvingChance = document.getElementById('chance-by-halving');

        const untilHalvingText = (data['untilNextHalvingChanceText'] ?? '').toString().trim();

        if (untilHalvingText !== '') {
            halvingChance.innerHTML = untilHalvingText;
            halvingRow.style.display = '';
        } else {
            halvingChance.innerHTML = '';
            halvingRow.style.display = 'none';
        }

        // ---- last mining reward block visibility logic ----
        const lastBlockRow = document.getElementById('last-mining-reward-block-row');
        const lastBlockRow2 = document.getElementById('last-mining-reward-block-row2');
        const lastBlockChance = document.getElementById('chance-by-last-block');

        const untilLastBlockText = (data['untilLastMiningRewardBlockChanceText'] ?? '').toString().trim();

        if (untilLastBlockText !== '') {
            lastBlockChance.innerHTML = untilLastBlockText;
            lastBlockRow.style.display = '';
            lastBlockRow2.style.removeProperty('display');
        } else {
            lastBlockChance.innerHTML = '';
            lastBlockRow.style.display = 'none';
            lastBlockRow2.style.setProperty('display', 'none', 'important');
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        // ✅ restore button
        calcBtn.disabled = false;
        calcBtn.innerHTML = 'Calculate';
    }
}

document.getElementById('inputHashrate').addEventListener('keypress', function (event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.keyCode === 13) {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Call the calculateHashrate function
        calculateHashrate();
    }
});