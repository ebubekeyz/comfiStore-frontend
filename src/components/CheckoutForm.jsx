import { Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { customFetch, formatPrice } from '../utils';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/order/orderSlice';

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const info = {
      name,
      address,
      chargeTotal: (orderTotal / 100).toFixed(2),
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };

    store.dispatch(addItem(info));
    try {
      const resp = await customFetch.post(
        '/orders',
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      queryClient.removeQueries(['orders']);
      store.dispatch(clearCart());
      toast.success('order placed successfully, please make payment');
      return redirect('/paystack');
    } catch (error) {
      const errorMessage =
        error?.resp?.data?.error?.message ||
        'there was an error placing your order';
      toast.error(errorMessage);

      if (error?.resp?.status === 401 || 403) return redirect('/login');
      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <Form method="post" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">shipping information</h4>
      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />
      <div className="mt-4">
        <SubmitBtn text="place your order" />
      </div>
    </Form>
  );
};
export default CheckoutForm;
