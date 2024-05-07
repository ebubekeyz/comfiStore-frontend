import { Form, useLoaderData, useNavigation } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import SectionTitle from './SectionTitle';
import { BsCheck, BsClockFill } from 'react-icons/bs';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import FormInput from '../components/FormInput';
import { useState } from 'react';
import BreadCrumb from './BreadCrumb';
day.extend(advancedFormat);

export const action =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if ((!user && user.role !== 'admin') || user.role !== 'owner') {
      toast.warn('You must be logged in to view this page');
      return redirect('/login');
    }

    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
    const param = JSON.parse(localStorage.getItem('id'));
    console.log(user.token);

    try {
      const response = await customFetch.patch(`/orders/${param.idd}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      toast.success('order confirmed successfully');
      window.location.reload();
      return null;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'please double check your credentials';

      toast.error(errorMessage);
      return null;
    }
  };

const NewOrderList = () => {
  const { meta, orders } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  if (orders.length === 0) {
    <SectionTitle text="No Order" />;
  }

  const handleSubmit = (id) => {
    const idNum = { idd: id };
    localStorage.setItem('id', JSON.stringify(idNum));
  };

  return (
    <div className="mt-8">
      <BreadCrumb
        text1="Home"
        text2="New Order"
        url1="/dashboard"
        url2="/dashboard/newOrder"
      />
      <h4 className="mb-4 capitalize">Total orders : {orders.length}</h4>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th className="hidden sm:block">Date</th>
              <th>Confirm</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const {
                _id,
                name,
                address,
                numItemsInCart,
                orderTotal,
                createdAt,
              } = order;
              const date = day(createdAt).format('hh:mm a - MMM Do, YYYY');
              return (
                <tr key={_id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{numItemsInCart}</td>
                  <td>{orderTotal}</td>
                  <td className="hidden sm:block">{date}</td>
                  <td>
                    {orders ? (
                      <Form method="patch">
                        <FormInput
                          type="hidden"
                          defaultValue="paid"
                          name="status"
                        />
                        <button
                          className="btn-primary btn-block capitalize"
                          disabled={isSubmitting}
                          onClick={(e) => handleSubmit(_id)}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="loading loading-spinner"></span>
                            </>
                          ) : (
                            <BsClockFill className="w-10 text-primary font-extrabold" />
                          )}
                        </button>
                      </Form>
                    ) : (
                      <BsCheck className="h6 w-6" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default NewOrderList;
