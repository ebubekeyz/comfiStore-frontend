import { Form, useLoaderData, Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import FormRange from '../components/FormRange';
import FormCheckbox from '../components/FormCheckbox';

const Filters = () => {
  const { meta, params } = useLoaderData();
  const { search, sort, date, status } = params;
  return (
    <Form
      method="get"
      className=" rounded-md px-8 py-4 bg-base-200 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 items-center"
    >
      {/* SEARCH */}
      <FormInput
        type="text"
        label="Search Name"
        name="search"
        size="input-sm"
        defaultValue={search}
      />

      {/* ORDER */}
      <FormSelect
        label="sort by"
        name="sort"
        list={['', 'z-a', 'a-z', 'latest', 'oldest']}
        size="select-sm"
        defaultValue={sort}
      />
      {/* PRICE */}
      {/* <FormRange
        name="price"
        label="select price"
        size="range-sm"
        price={price}
      /> */}
      {/* STATUS */}
      <FormSelect
        label="status"
        name="status"
        list={['', 'pending', 'paid']}
        size="select-sm"
      />

      <FormInput
        type="date"
        label="date"
        name="date"
        size="input-sm"
        defaultValue={date}
      />

      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm">
        search
      </button>
      <Link to="/dashboard/orders" className="btn btn-accent btn-sm">
        reset
      </Link>
    </Form>
  );
};
export default Filters;
