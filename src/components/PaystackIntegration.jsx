import PaystackPop from '@paystack/inline-js';
import { useSelector } from 'react-redux';

import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { Form, useActionData, useLoaderData } from 'react-router-dom';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const { name, email, amount } = Object.fromEntries(formData);

  try {
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: import.meta.env.VITE_SPACE_KEY,
      amount: amount * 100,
      email: email,
      name: name,
      onSuccess(transaction) {
        let message = `Payment Complete! Reference ${transaction.reference}`;
        toast.success(message);
      },
      onCancel() {
        toast.error(`You have canceled the transaction`);
      },
    });
    return null;
  } catch (error) {
    console.log(error);
  }
};

const PaystackIntegration = () => {
  const order = useSelector((state) => state.orderState.orderItems);
  const { identifier } = useSelector((state) => state.userState.user);

  return (
    <div className="h-screen grid place-items-center text-3xl">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Make Payment</h4>
        <FormInput
          label="email"
          name="email"
          type="email"
          defaultValue={identifier}
        />
        <FormInput
          label="first name"
          name="name"
          type="text"
          defaultValue={order.name}
        />
        <FormInput
          label="amount"
          name="amount"
          type="text"
          defaultValue={order.chargeTotal}
        />
        <div className="mt-4">
          <SubmitBtn text="pay" />
        </div>
      </Form>
    </div>
  );
};
export default PaystackIntegration;
