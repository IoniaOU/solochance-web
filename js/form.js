async function calculateHashrate() {
    const currency = document.getElementById('selectCurrency').value;
    const hashrateUnit = document.getElementById('selectHashrateUnit').value;
    const hashrate = document.getElementById('inputHashrate').value;

    const apiUrl = `https://api.solochance.org/getSoloChanceCalculations?currency=${currency}&hashrate=${hashrate}&hashrateUnit=${hashrateUnit}`;

    try {
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
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}