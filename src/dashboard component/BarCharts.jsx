import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from 'recharts';
import { productSales } from './ProductSales';
import moment from 'moment';
import { formatPrice } from '../utils';

import { useLoaderData } from 'react-router-dom';

const BarCharts = () => {
  const { users, products, orders } = useLoaderData();

  const productMap = products.slice(0, 4).map((product) => {
    let { price, title, createdAt } = product;
    createdAt = moment(createdAt).format('Do MMMM YYYY');
    return { price, title, createdAt };
  });

  return (
    <div className="pb-96 relative h-full">
      <div className="absolute top-0 left-0 w-full h-full">
        <ResponsiveContainer>
          <BarChart width={500} height={400} data={productMap}>
            <YAxis />
            <XAxis dataKey="createdAt" />
            <CartesianGrid strokeDasharray="5 5" />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              type="monotone"
              stroke="#2563eb"
              fill="#3b82f6"
              dataKey="price"
              stackId="1"
              margin={{ right: 200 }}
            />
          </BarChart>
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
          Price 1:
          <span className="ml-2">{formatPrice(payload[0].value)}</span>
        </p>
      </div>
    );
  }
};
export default BarCharts;
