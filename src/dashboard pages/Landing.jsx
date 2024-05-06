import { redirect, useNavigate } from 'react-router-dom';
import { FeaturedProducts, Hero } from '../components';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const url = '/products?featured=true';

export const loader = (store) => async () => {
  const user = store.getState().userState.user;

  if ((!user && user.role !== 'admin') || user.role !== 'owner') {
    toast.warn('You must be logged in to view this page');
    return redirect('/login');
  }
  return null;
};

const Landing = () => {
  return (
    <>
      <h1 className="text-3xl">Hello</h1>
    </>
  );
};
export default Landing;
