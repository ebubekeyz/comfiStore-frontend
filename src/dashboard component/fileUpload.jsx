import { BsCloudUpload, BsCloudUploadFill, BsUpload } from 'react-icons/bs';
import { Form, redirect } from 'react-router-dom';
import { FormInput } from '../components';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';

export const action =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    if ((!user && user.role !== 'admin') || user.role !== 'owner') {
      toast.warn('You must be logged in to view this page');
      return redirect('/login');
    }

    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data.image);

    const formData2 = new FormData();

    formData2.append('image', data.image);
    try {
      const response = await customFetch.post('/upload', formData2);

      const image = response.data.image.src;

      const img = {
        image: image,
      };
      // const mainImage = JSON.parse(localStorage.getItem('id'));

      localStorage.setItem('image', JSON.stringify(img));

      toast.success('Image uploaded successfully');
      return { image };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'please double check your credentials';

      toast.error(errorMessage);
      return null;
    }
  };

const FileUpload = () => {
  return (
    <>
      <Form
        method="post"
        className="lg:col-span-4"
        encType="multipart/form-data"
      >
        <input
          type="file"
          name="image"
          className="file-input file-input-ghost w-full max-w-xs"
        />
        <button className="btn">submit</button>
      </Form>

      <div className="mt-4 grid gap-8 lg:grid-cols-8 border-t border-base-300 pt-5 ">
        <div className="border rounded-xl p-16 w-72 grid place-items-center border-zinc-600 bg-zinc-600">
          <BsCloudUploadFill className="text-3xl text-gray-900" />
          <h3 className="text-center">
            Choose a File or drag and drop it here{' '}
          </h3>
        </div>

        <div className="lg:col-span-8"></div>
      </div>
    </>
  );
};
export default FileUpload;
