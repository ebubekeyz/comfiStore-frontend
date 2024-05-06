import axios from 'axios';

// const bearerToken = JSON.parse(localStorage.getItem('user')) || '';

// const { token } = bearerToken;

// const productionUrl = 'https://strapi-store-server.onrender.com/api';
const productionUrl = 'https://comfi-server-api.onrender.com/api';

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
// export const formatPrice = (price) => {
//   const dollarAmount = new Intl.NumberFormat('en-NG', {
//     style: 'currency',
//     currency: 'NG',
//   }).format((price / 100).toFixed(2));
//   return dollarAmount;
// };

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
