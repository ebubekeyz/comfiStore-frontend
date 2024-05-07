import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { customFetch, formatPrice } from '../utils';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProductsList = () => {
  const { products } = useLoaderData();
  const user = useSelector((state) => state.userState.user);

  const nav = useNavigate();

  const submitEditId = async (id) => {
    const prodEditId = {
      editId: id,
    };
    localStorage.setItem('editId', JSON.stringify(prodEditId));
  };

  const submitId = async (id) => {
    const prodId = {
      idd: id,
    };
    localStorage.setItem('productId', JSON.stringify(prodId));

    const mainId = JSON.parse(localStorage.getItem('productId'));

    try {
      const resp = await customFetch.delete(`/products/${mainId.idd}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      localStorage.removeItem('productId');
      toast.success('Product successfully deleted');
      nav('/dashboard/products');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const { title, company, price, image } = product;
        return (
          <div className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-200 group">
            <img
              src={image}
              alt={title}
              className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="ml-0 sm:ml-16">
              <h3 className="capitalize font-medium text-lg">{title}</h3>
              <h4 className="capitalize text-md text-neutral-content">
                {company}
              </h4>
            </div>
            <div className="font-medium ml-0 sm:ml-auto text-lg flex gap-x-4 ">
              <Link
                to={`/dashboard/editProduct/${product._id}`}
                className="btn btn-xs btn-primary"
                onClick={() => submitEditId(product._id)}
              >
                Edit
              </Link>
              <button
                className="btn btn-xs btn-info"
                onClick={() => submitId(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ProductsList;
