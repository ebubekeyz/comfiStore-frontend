import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from 'recharts';
import { productSales } from './ProductSales';
import moment from 'moment';

import { useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils';

const AreaCharts = () => {
  const { users, products, orders } = useLoaderData();
  const orderMap = orders.slice(0, 4).map((order) => {
    let {
      name,
      cartItems: [{ price: price }],
      status,
      createdAt,
    } = order;

    createdAt = moment(createdAt).format('Do MMMM YYYY');

    return { name, price, status, createdAt };

    console.log(products);
  });
  return (
    <div className="pb-96 relative h-full">
      <div className="absolute top-0 left-0 w-full h-full">
        <ResponsiveContainer>
          <AreaChart width={500} height={400} data={orderMap}>
            <YAxis />
            <XAxis dataKey="createdAt" />
            <CartesianGrid strokeDasharray="5 5" />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              stroke="#2563eb"
              fill="#3b82f6"
              dataKey="price"
              stackId="1"
              margin={{ right: 200 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Price:
          <span className="ml-2">{formatPrice(payload[0].value)}</span>
        </p>
      </div>
    );
  }
};
export default AreaCharts;
