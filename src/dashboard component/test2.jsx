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

import { useLoaderData } from 'react-router-dom';

const AreaCharts = () => {
  const { users, products, orders } = useLoaderData();

  return (
    <div className="pb-96 relative h-full">
      <div className="absolute top-0 left-0 w-full h-full">
        <ResponsiveContainer>
          <AreaChart width={500} height={400} data={productSales}>
            <YAxis />
            <XAxis dataKey="name" />
            <CartesianGrid strokeDasharray="5 5" />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              stroke="#2563eb"
              fill="#3b82f6"
              dataKey="product1"
              stackId="1"
              margin={{ right: 200 }}
            />
            <Area
              type="monotone"
              dataKey="product2"
              stackId="1"
              stroke="#7c3aed"
              fill="#8b5cf6"
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
          Product 1:
          <span className="ml-2">${payload[0].value}</span>
        </p>
        product 2:
        <span className="ml-2">${payload[1].value}</span>
      </div>
    );
  }
};
export default AreaCharts;
