import { Outlet, useNavigation } from 'react-router-dom';
import { Header, Navbar, Loading } from '../dashboard component';
import { customFetch } from '../utils';

// const ordersQuery = (user) => {
//   return {
//     queryKey: ['order2', user.username],
//     queryFn: () => customFetch.get('/orders/allOrders?status=pending'),
//   };
// };

export const loader = (store) => async () => {
  const user = store.getState().userState.user;
  try {
    const resp = await customFetch.get('/orders/allOrders?status=pending');

    const orders = resp.data.order;
    console.log(orders.length);

    return { orders };
  } catch (error) {
    console.log(error);
  }
  return null;
};

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <>
      <Header />
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
    </>
  );
};
export default HomeLayout;
