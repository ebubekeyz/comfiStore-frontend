import { toast } from 'react-toastify';
import { PaystackIntegration } from '../components';
import { redirect } from 'react-router-dom';

export const loader = (store) => () => {
  const user = store.getState().userState.user;

  if (!user) {
    toast.warn('You must be logged in to view this page');
    return redirect('/login');
  }
  return null;
};

const Paystack = () => {
  return (
    <div>
      <PaystackIntegration />
    </div>
  );
};
export default Paystack;
