import { redirect } from 'react-router-dom';
import {
  Filters,
  ProductsContainer,
  PaginationContainer,
} from '../dashboard component';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
const url = '/products?sort=latest';

const allProductsQuery = (queryParams) => {
  const { search, sort, price, category, company, shipping, page } =
    queryParams;
  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(url, {
        params: queryParams,
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if ((!user && user.role !== 'admin') || user.role !== 'owner') {
      toast.warn('You must be logged in to view this page');
      return redirect('/login');
    }
    // const params = new URL(request.url).searchParams;
    // const search = params.get('search');
    // console.log(search);
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );
    const products = response.data.attributes;

    const meta = response.data.meta;

    return { products, meta, params };
  };

const ModifyProducts = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};
export default ModifyProducts;
