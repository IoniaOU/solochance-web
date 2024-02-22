async function calculateHashrate() {
    const currency = document.getElementById('selectCurrency').value;
    const hashrateUnit = document.getElementById('selectHashrateUnit').value;
    const hashrate = document.getElementById('inputHashrate').value;

    const apiUrl = `https://api.solochance.org/getSoloChanceCalculations?currency=${currency}&hashrate=${hashrate}&hashrateUnit=${hashrateUnit}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const resultContainer = document.getElementById('result');
        resultContainer.innerHTML = `<p>API Response:</p>
                                 <pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}