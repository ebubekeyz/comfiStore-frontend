import { redirect, useNavigate } from 'react-router-dom';
import { FeaturedProducts, Hero } from '../components';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  AreaCharts,
  BarCharts,
  LineCharts,
  SectionTitle,
} from '../dashboard component';
import { customFetch } from '../utils';

const url = '/products?featured=true';

export const loader = (store) => async () => {
  const user = store.getState().userState.user;

  if ((!user && user.role !== 'admin') || user.role !== 'owner') {
    toast.warn('You must be logged in to view this page');
    return redirect('/login');
  }

  const resp = await customFetch('auth');
  const resp2 = await customFetch('/products?sort=latest');
  const resp3 = await customFetch('/orders/allOrders?sort=latest');

  const users = resp.data.users;
  const products = resp2.data.attributes;
  const orders = resp3.data.order;
  console.log(users);

  return { users, products, orders };
};

const Landing = () => {
  return (
    <>
      <div className="grid lg:grid-cols-1 items-center gap-10">
        <SectionTitle text="Orders" />
        <AreaCharts />
        <SectionTitle text="Products" />
        <BarCharts />
      </div>
    </>
  );
};
export default Landing;
