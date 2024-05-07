import { Form, useLoaderData } from 'react-router-dom';
import { FormInput, SubmitBtn, TextAreaInput } from '../components';
import FormCheckbox from '../components/FormCheckbox';
import FormSelect from '../components/FormSelect';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

export const action =
  (store) =>
  async ({ params, request }) => {
    const user = store.getState().userState.user;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.patch(`/products/${params.id}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      localStorage.removeItem('image');
      toast.success('Product successfully Edited');
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

const EditProductForm = () => {
  const [data, setData] = useState([]);
  const mainImage = JSON.parse(localStorage.getItem('image')) || '';
  const imgUrl = mainImage.image === 'undefined' ? '' : mainImage.image;

  const getSingleProduct = async () => {
    const mainId = JSON.parse(localStorage.getItem('editId'));
    const resp = await customFetch.get(`/products/${mainId.editId}`);
    setData(resp.data.attributes);
  };

  useEffect(() => {
    getSingleProduct();
    document.getElementById('textArea').defaultValue = data.description || '';

    document.getElementById('color').value = data.colors;
  }, [getSingleProduct]);

  return (
    <Form method="patch">
      <FormInput
        type="text"
        label="Title"
        name="title"
        size="input-md"
        defaultValue={data.title || ''}
      />
      <FormSelect
        label="company"
        name="company"
        list={[`${data.company || ''}`, 'Italian', 'Adidas']}
        size="select-md"
      />

      <FormCheckbox
        name="shipping"
        label="free shipping"
        size="checkbox-md"
        defaultValue={data.shipping}
      />

      <FormSelect
        label="featured"
        name="featured"
        list={[`${data.featured || ''}`, 'true', 'false']}
        size="select-md"
      />

      <FormSelect
        label="category"
        name="category"
        list={[
          `${data.category || ''}`,
          'wedding dress',
          'bridal wedding dress',
        ]}
        size="select-md"
      />

      <FormInput
        type="text"
        label="Price"
        name="price"
        size="input-md"
        defaultValue={data.price || ''}
      />

      <FormInput
        type="text"
        label="Paste Image URL {Recommended from Pinterest)"
        name="image"
        size="input-md"
        defaultValue={imgUrl || '' || data.image}
      />

      <FormInput
        type="color"
        label="color"
        name="colors"
        size="input-sm"
        id="color"
      />

      <TextAreaInput
        label="Description"
        id="textArea"
        name="description"
        text={data.description || ''}
      />

      <SubmitBtn text="Edit Product" />
    </Form>
  );
};
export default EditProductForm;
