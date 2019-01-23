const parseRates = {
    getCurrencyPairs(rawCurrencyRatesData) {
        let currencyRateDate = [];
        rawCurrencyRatesData.forEach(rawCurrencyRateData => {
            currencyRateDate.push({
                base_currency: rawCurrencyRateData.$.BASE_CUR,
                quote_currency: rawCurrencyRateData.$.QUOTE_CUR,
                time: rawCurrencyRateData.Obs[0].$.TIME_PERIOD,
                value: parseFloat(rawCurrencyRateData.Obs[0].$.OBS_VALUE)
            });
        })
        return currencyRateDate
    }
}

module.exports = parseRates;