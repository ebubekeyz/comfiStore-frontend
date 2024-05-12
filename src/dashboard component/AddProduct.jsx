import { BsCloudUpload, BsCloudUploadFill, BsUpload } from 'react-icons/bs';
import { Form, redirect } from 'react-router-dom';
import { FormInput, TextAreaInput } from '../components';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FormSelect from '../components/FormSelect';
import FormCheckbox from '../components/FormCheckbox';
import AddProductForm from './AddProductForm';

const AddProduct = () => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img
          src={file.preview}
          alt={file.name}
          className="h-32 object-cover w-80 rounded-lg mt-4"
        />
      </div>
    </div>
  ));

  const submitImage = async () => {
    const formData = new FormData();

    formData.append('image', files[0]);
    try {
      const resp = await customFetch.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { src } = resp.data.image;
      let originUrl =
        process.env.NODE_ENV !== 'production'
          ? 'http://localhost:4000'
          : 'https://comfi-server-api.onrender.com';
      const imageSrc = {
        image: `${originUrl}${src}`,
      };
      localStorage.setItem('image', JSON.stringify(imageSrc));
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));

    if (files[0] !== 'undefined') {
      submitImage();
    }
    // submitImage();
  }, [files]);

  return (
    <section className="mt-4 grid gap-8 lg:grid-cols-8">
      <div
        {...getRootProps({ className: 'dropzone' })}
        className="lg:col-span-4 "
      >
        <input {...getInputProps()} />

        <div className="card rounded-lg bg-base-200 py-24">
          <div className="card-body">
            <p className="text-center">
              Drag and drop file here, or click to select file
            </p>
            <BsCloudUpload className="text-3xl text-center mt-4 mx-auto text-primary animate-bounce" />
          </div>
        </div>
        <aside>{thumbs}</aside>
      </div>

      <div className="lg:col-span-4 lg:pl-4">
        <AddProductForm />
      </div>
    </section>
  );
};
export default AddProduct;
