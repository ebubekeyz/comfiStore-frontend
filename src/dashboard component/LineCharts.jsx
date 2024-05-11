import {
  LineChart,
  Line,
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

const LineCharts = () => {
  const { users, products, orders } = useLoaderData();
  const userMap = users.slice(0, 4).map((order) => {
    let { name, createdAt } = order;

    createdAt = moment(createdAt).format('Do MMMM YYYY');

    return { name, createdAt };

    console.log(products);
  });
  return (
    <div className="pb-96 relative h-full">
      <div className="absolute top-0 left-0 w-full h-full">
        <ResponsiveContainer>
          <LineChart width={500} height={400} data={userMap}>
            <YAxis />
            <XAxis dataKey="createdAt" />
            <CartesianGrid strokeDasharray="5 5" />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              stroke="#2563eb"
              fill="#3b82f6"
              dataKey="name"
              stackId="1"
              margin={{ right: 200 }}
            />
          </LineChart>
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
          Name:
          <span className="ml-2">{formatPrice(payload[0].value)}</span>
        </p>
      </div>
    );
  }
};
export default LineCharts;
