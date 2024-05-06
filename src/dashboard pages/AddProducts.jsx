import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SectionTitle } from '../dashboard component';

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
    <div>
      <SectionTitle text="Add Product" />
    </div>
  );
};
export default AddProducts;
