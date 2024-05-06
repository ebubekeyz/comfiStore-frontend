import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  Login,
  Checkout,
  Orders,
  Paystack,
} from './pages';
import {
  HomeLayout as HomeLayout2,
  Landing as Landing2,
  Orders as Orders2,
  AddProducts,
  Error as Error2,
  Users,
} from './dashboard pages';

// loaders
import { loader as orderLoader2 } from './dashboard pages/Orders';
import { loader as userLoader2 } from './dashboard pages/Users';
import { loader as landingLoader } from './pages/Landing';
import { loader as singlePageLoader } from './pages/SingleProduct';
import { loader as productsLoader } from './pages/Products';
import { loader as checkoutLoader } from './pages/Checkout';
import { loader as orderLoader } from './pages/Orders';
import { loader as paystackLoader } from './pages/Paystack';
// actions
import { action as paystackAction } from './components/PaystackIntegration';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
// you dont always have to set ur action in the actual page. it can also be set in the component
import { action as checkoutAction } from './components/CheckoutForm';

import { store } from './store';
import { ErrorElement } from './components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: landingLoader(queryClient),
      },
      {
        path: 'products',
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: productsLoader(queryClient),
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singlePageLoader(queryClient),
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      { path: 'about', element: <About /> },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store, queryClient),
      },
      {
        path: 'orders',
        element: <Orders />,
        loader: orderLoader(store, queryClient),
      },
    ],
  },

  {
    path: 'paystack',
    element: <Paystack />,
    loader: paystackLoader(store),
    action: paystackAction,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },

  {
    path: '/dashboard',
    element: <HomeLayout2 />,
    errorElement: <Error2 />,
    children: [
      {
        index: true,
        element: <Landing2 />,
        loader: landingLoader,
      },
      {
        path: '/dashboard/orders',
        element: <Orders2 />,
        loader: orderLoader2(store, queryClient),
      },
      {
        path: '/dashboard/addProducts',
        element: <AddProducts />,
      },
      {
        path: '/dashboard/users',
        element: <Users />,
        loader: userLoader2(store, queryClient),
      },
      {
        path: '/dashboard/products',
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: productsLoader(queryClient),
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;