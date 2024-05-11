import { useLoaderData } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const UsersList = () => {
  const { meta, users } = useLoaderData();
  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize">Total users : {meta.pagination.total}</h4>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>role</th>
              <th className="hidden sm:block">Date</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const { _id, name, identifier: email, role, createdAt } = user;
              const date = day(createdAt).format('hh:mm a - MMM Do, YYYY');
              return (
                <tr key={_id}>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{role}</td>

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
export default UsersList;
