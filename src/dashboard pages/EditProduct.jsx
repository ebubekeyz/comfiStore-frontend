import { Link, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  EditProduct as Edit,
  BreadCrumb,
  SectionTitle,
} from '../dashboard component';
import { customFetch } from '../utils';

export const loader = (store) => async () => {
  const user = store.getState().userState.user;
  if ((!user && user.role !== 'admin') || user.role !== 'owner') {
    toast.warn('You must be logged in to view this page');
    return redirect('/login');
  }
  const resp = await customFetch.get('/products');
  const products = resp.data.attributes;

  return { products };
};

const EditProduct = () => {
  return (
    <>
      <BreadCrumb
        text1="Home"
        text2="Edit Product"
        url1="/dashboard"
        url2="/dashboard/editProduct"
      />
      <Edit />
    </>
  );
};
export default EditProduct;
