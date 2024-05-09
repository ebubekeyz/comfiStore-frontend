import { Form, useLoaderData } from 'react-router-dom';
import { FormInput, SubmitBtn, TextAreaInput, TinyMCE } from '../components';
import FormCheckbox from '../components/FormCheckbox';
import FormSelect from '../components/FormSelect';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { data } from 'autoprefixer';

let content;

export const action =
  (store) =>
  async ({ params, request }) => {
    const user = store.getState().userState.user;
    const formData = await request.formData();
    let data2 = Object.fromEntries(formData);

    const mainDesc2 = JSON.parse(localStorage.getItem('description'));

    const mainShipping = JSON.parse(localStorage.getItem('shipping'));

    let description;
    let shipping;

    let ship = JSON.parse(localStorage.getItem('checkbox'));
    if (ship && ship.check === false) {
      ship = 'off';
    } else if (ship && ship.check === true) {
      ship = 'on';
    } else {
      ship = mainShipping.mainShip;
    }
    shipping = ship;

    const desc = JSON.parse(localStorage.getItem('desc'));
    description = desc ? desc.content : mainDesc2.mainDesc;

    data2 = { ...data2, description: description, shipping: shipping };
    console.log(data2);
    try {
      const response = await customFetch.patch(
        `/products/${params.id}`,
        data2,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      localStorage.removeItem('image');
      localStorage.removeItem('desc');
      localStorage.removeItem('shipping');
      localStorage.removeItem('checkbox');
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

    const mainDesc = {
      mainDesc: resp.data.attributes.description,
    };
    localStorage.setItem('description', JSON.stringify(mainDesc));

    const mainShip = {
      mainShip: resp.data.attributes.shipping,
    };
    localStorage.setItem('shipping', JSON.stringify(mainShip));
  };

  const handleSubmit = (e) => {
    const tiny = {
      content: e.target.getContent() ? e.target.getContent() : data.description,
    };
    localStorage.setItem('desc', JSON.stringify(tiny));
  };
  const handleSubmit2 = (e) => {
    const check = {
      check: e.target.checked,
    };
    localStorage.setItem('checkbox', JSON.stringify(check));
  };

  useEffect(() => {
    getSingleProduct();
    // document.getElementById('textArea').defaultValue = data.description || '';

    document.getElementById('color1').value = data.color1;
    document.getElementById('color2').value = data.color2;
    document.getElementById('color3').value = data.color3;
    document.getElementById('color4').value = data.color4;
  }, [getSingleProduct]);

  return (
    <Form method="patch">
      <FormInput
        type="text"
        label="Title"
        name="title"
        size="input-md"
        defaultValue={data.title}
      />
      {/* <FormSelect
        label="company"
        name="company"
        list={[`${data.company}`, 'Italian', 'Adidas']}
        size="select-md"
          defaultValue={data.company}
      /> */}
      <FormInput
        type="text"
        label="company"
        name="company"
        size="input-md"
        defaultValue={data.company}
      />

      <FormCheckbox
        name="shipping"
        label="free shipping"
        id="checkbox"
        size="checkbox-md"
        defaultValue={data.shipping}
        onChange={handleSubmit2}
      />

      {/* <FormSelect
        label="featured"
        name="featured"
        list={[`${data.featured}`, 'true', 'false']}
        size="select-md"
      /> */}
      <FormInput
        type="text"
        label="featured"
        name="featured"
        size="input-md"
        defaultValue={data.featured}
      />

      {/* <FormSelect
        label="category"
        name="category"
        list={[
          `${data.category || ''}`,
          'wedding dress',
          'bridal wedding dress',
        ]}
        size="select-md"
      /> */}
      <FormInput
        type="text"
        label="category"
        name="category"
        size="input-md"
        defaultValue={data.category}
      />

      <FormInput
        type="text"
        label="Price"
        name="price"
        size="input-md"
        defaultValue={data.price}
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
          name="color1"
          size="input-sm"
          id="color1"
          value={data.color1}
        />
        <FormInput
          type="color"
          name="color2"
          size="input-sm"
          id="color2"
          value={data.color2}
        />
        <FormInput
          type="color"
          name="color3"
          size="input-sm"
          id="color3"
          value={data.color3}
        />
        <FormInput
          type="color"
          name="color4"
          size="input-sm"
          id="color4"
          value={data.color4}
        />
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
