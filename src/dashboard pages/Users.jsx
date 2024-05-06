import { toast } from 'react-toastify';
import { redirect, useLoaderData } from 'react-router-dom';
import { customFetch } from '../utils';
import {
  ComplexPaginationContainer,
  SectionTitle,
  UsersList,
} from '../dashboard component';

const ordersQuery = (params, user) => {
  return {
    queryKey: ['order', user.username, params.page ? parseInt(params.page) : 1],
    queryFn: () =>
      customFetch.get('/auth', {
        params,
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
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const resp = await queryClient.ensureQueryData(ordersQuery(params, user));
      const users = resp.data.users;
      console.log(users);
      const meta = resp.data.meta;
      return { users, meta };
    } catch (error) {
      const errorMessage =
        error?.resp?.data?.error?.message ||
        'there was an error placing your order';
      toast.error(errorMessage);

      if (error?.resp?.status === 401 || 403) return redirect('/login');
      return null;
    }
  };

const Users = () => {
  const { meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle text="please make an order" />;
  }
  return (
    <>
      <SectionTitle text="Users" />
      <UsersList />
      <ComplexPaginationContainer />
    </>
  );
};
export default Users;
