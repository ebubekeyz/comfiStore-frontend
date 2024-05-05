import { useLoaderData } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const OrdersList = () => {
  const { meta, orders } = useLoaderData();
  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize">
        Total orders : {meta.pagination.total}
      </h4>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrdersList;
