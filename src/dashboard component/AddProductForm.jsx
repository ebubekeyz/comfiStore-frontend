import { Form } from 'react-router-dom';
import { FormInput, SubmitBtn, TextAreaInput } from '../components';
import FormCheckbox from '../components/FormCheckbox';
import FormSelect from '../components/FormSelect';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';

export const action =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      const response = await customFetch.post('/products', data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      localStorage.removeItem('image');
      toast.success('Product successfully Added');
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

const AddProductForm = () => {
  const mainImage = JSON.parse(localStorage.getItem('image')) || '';
  const imgUrl = mainImage.image === 'undefined' ? '' : mainImage.image;

  console.log(imgUrl);
  return (
    <Form method="post">
      <FormInput type="text" label="Title" name="title" size="input-md" />
      <FormSelect
        label="company"
        name="company"
        list={['', 'Italian', 'Adidas']}
        size="select-md"
      />

      <FormCheckbox name="shipping" label="free shipping" size="checkbox-md" />

      <FormSelect
        label="featured"
        name="featured"
        list={['', 'true', 'false']}
        size="select-md"
      />

      <FormSelect
        label="category"
        name="category"
        list={['', 'wedding dress', 'bridal wedding dress']}
        size="select-md"
      />

      <FormInput type="text" label="Price" name="price" size="input-md" />

      <FormInput
        type="text"
        label="Paste Image URL {Recommended from Pinterest)"
        name="image"
        size="input-md"
        defaultValue={imgUrl || ''}
      />

      <FormInput type="color" label="color" name="colors" size="input-sm" />

      <TextAreaInput label="Description" name="description" />

      <SubmitBtn text="Add Product" />
    </Form>
  );
};
export default AddProductForm;
