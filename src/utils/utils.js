// calculate exchange rate using 3 sets of currencies.
// rates array includes exchange rates for toCurrency and fromCurrency,
// based on the third constant currency type.
// this method will returns the exchange rate for toCurrency by given amount of fromCurrency.
export const getExchangeRate = (amount, rates, toCurrency, fromCurrency) => {
    let exchangeRate = ((amount * rates[toCurrency]) / rates[fromCurrency])
    exchangeRate = Math.round(exchangeRate * 100) / 100
    return isNaN(exchangeRate) ? 0 : exchangeRate
}