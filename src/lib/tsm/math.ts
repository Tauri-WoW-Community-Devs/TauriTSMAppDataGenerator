export const calculateMarketValue = (prices: number[]) => {
  let prevPrice = 0;
  let price = 0;
  const count = prices.length;

  let passes = [];

  for (let i = 0; i < count; i++) {
    prevPrice = price;
    price = prices[i];

    if (i < count * 0.15 || prevPrice * 1.2 >= price) {
      passes.push(price);
      continue;
    }
    break;
  }

  passes = deleteAtypical(passes);
  return Math.round(avg(passes));
};

const deleteAtypical = (prices: number[]) => {
  const average = avg(prices);
  const std = standardDeviation(prices) * 1.5;

  const lowest = average - std;
  const highest = average + std;

  return prices.filter(price => price >= lowest && price <= highest);
};

const standardDeviation = (prices: number[]) => {
  const n = prices.length;
  const average = avg(prices);
  return Math.sqrt(prices.map(x => Math.pow(x - average, 2)).reduce((a, b) => a + b) / n);
};

const sum = (values: number[]) => values.reduce((prev, curr) => prev + curr);
const avg = (values: number[]) => sum(values) / values.length;
