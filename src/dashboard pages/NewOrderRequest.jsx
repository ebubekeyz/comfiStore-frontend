import { toast } from 'react-toastify';
import { redirect, useLoaderData } from 'react-router-dom';
import { customFetch } from '../utils';
import {
  ComplexPaginationContainer,
  NewOrderList,
  SectionTitle,
} from '../dashboard component';

// const ordersQuery = (params, user) => {
//   return {
//     queryKey: ['order', user.name, params.page ? parseInt(params.page) : 1],
//     queryFn: () =>
//       customFetch.get('/orders/allOrders?status=pending', {
//         params,
//       }),
//   };
// };

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if ((!user && user.role !== 'admin') || user.role !== 'owner') {
      toast.warn('You must be logged in to view this page');
      return redirect('/login');
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const resp = await customFetch.get('/orders/allOrders?status=pending', {
        params,
      });
      const orders = resp.data.order;

      const meta = resp.data.meta;
      return { orders, meta };
    } catch (error) {
      const errorMessage =
        error?.resp?.data?.error?.message ||
        'there was an error placing your order';
      toast.error(errorMessage);

      if (error?.resp?.status === 401 || 403) return redirect('/login');
      return null;
    }
  };

const NewOrderRequest = () => {
  const { meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle text="please make an order" />;
  }
  return (
    <>
      <SectionTitle text="New Order" />
      <NewOrderList />
      <ComplexPaginationContainer />
    </>
  );
};
export default NewOrderRequest;
