import { Form } from 'react-router-dom';
import { FormInput, SubmitBtn, TextAreaInput, TinyMCE } from '../components';
import FormCheckbox from '../components/FormCheckbox';
import FormSelect from '../components/FormSelect';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';

export const action =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    const formData = await request.formData();
    const {
      title,
      color1,
      color2,
      color3,
      color4,
      company,
      featured,
      shipping,
      category,
      price,
      colors,
      image,
    } = Object.fromEntries(formData);

    const desc = JSON.parse(localStorage.getItem('desc'));
    const description = !desc.content ? '' : desc.content;

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
      const response = await customFetch.post('/products', data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      localStorage.removeItem('image');
      localStorage.removeItem('desc');
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

  const handleSubmit = (e) => {
    const tiny = {
      content: e.target.getContent() ? e.target.getContent() : '',
    };
    localStorage.setItem('desc', JSON.stringify(tiny));
  };
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

      <div className="flex gap-x-2 ">
        <FormInput type="color" name="color1" size="input-sm" />
      </div>
      {/* <TextAreaInput label="Description" name="description" /> */}
      <TinyMCE onChange={handleSubmit} />

      <SubmitBtn text="Add Product" />
    </Form>
  );
};
export default AddProductForm;
