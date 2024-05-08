import axios from 'axios';

let productionUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:4000/api'
    : 'https://comfi-server.onrender.com/api';

export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const formatPrice = (price) => {
  const dollarAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format((price / 1).toFixed(2));
  return dollarAmount;
};

export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
