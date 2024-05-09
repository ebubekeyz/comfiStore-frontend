import { Form, useLoaderData } from 'react-router-dom';
import { FormInput, SubmitBtn, TextAreaInput, TinyMCE } from '../components';
import FormCheckbox from '../components/FormCheckbox';
import FormSelect from '../components/FormSelect';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

let content;

export const action =
  (store) =>
  async ({ params, request }) => {
    const user = store.getState().userState.user;
    const formData = await request.formData();
    const {
      title,
      company,
      featured,
      shipping,
      category,
      price,
      color1,
      color2,
      color3,
      color4,
      image,
    } = Object.fromEntries(formData);

    const desc = JSON.parse(localStorage.getItem('desc'));
    const description = desc.content;

    const data = {
      title: title,
      company: company,
      featured: featured,
      shipping: shipping,
      category: category,
      price: price,
      color1: color1,
      color2: color2,
      color3: color3,
      color4: color4,
      image: image,
      description: description,
    };
    try {
      const response = await customFetch.patch(`/products/${params.id}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      localStorage.removeItem('image');
      localStorage.removeItem('desc');
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
    // document.getElementById('textArea').defaultValue = data.description || '';

    document.getElementById('color1').value = data.color1;
    document.getElementById('color2').value = data.color2;
    document.getElementById('color3').value = data.color3;
    document.getElementById('color4').value = data.color4;
  }, [getSingleProduct]);

  const handleSubmit = (e) => {
    const tiny = {
      content: e.target.getContent(),
    };
    localStorage.setItem('desc', JSON.stringify(tiny));
  };

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

      <div className="flex gap-2">
        <FormInput
          type="color"
          label="color"
          name="color1"
          size="input-sm"
          id="color1"
        />
        <FormInput type="color" name="color2" size="input-sm" id="color2" />
        <FormInput type="color" name="color3" size="input-sm" id="color3" />
        <FormInput type="color" name="color4" size="input-sm" id="color4" />
      </div>

      {/* <TextAreaInput
        label="Description"
        id="textArea"
        name="description"
        text={data.description || ''}
      /> */}

      <TinyMCE value={data.description} onChange={handleSubmit} />
      <SubmitBtn text="Edit Product" />
    </Form>
  );
};
export default EditProductForm;
