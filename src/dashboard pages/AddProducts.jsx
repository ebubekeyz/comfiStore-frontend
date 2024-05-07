import { Link, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AddProduct, BreadCrumb, SectionTitle } from '../dashboard component';

export const loader = (store) => async () => {
  const user = store.getState().userState.user;
  if ((!user && user.role !== 'admin') || user.role !== 'owner') {
    toast.warn('You must be logged in to view this page');
    return redirect('/login');
  }

  return null;
};

const AddProducts = () => {
  return (
    <>
      <BreadCrumb
        text1="Home"
        text2="Add Product"
        url1="/dashboard"
        url2="/dashboard/addProducts"
      />
      <AddProduct />
    </>
  );
};
export default AddProducts;
