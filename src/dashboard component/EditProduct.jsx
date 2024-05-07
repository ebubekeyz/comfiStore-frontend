import { BsCloudUpload, BsCloudUploadFill, BsUpload } from 'react-icons/bs';
import { Form, redirect } from 'react-router-dom';
import { FormInput, TextAreaInput } from '../components';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FormSelect from '../components/FormSelect';
import FormCheckbox from '../components/FormCheckbox';
import EditProductForm from './EditProductForm';

const EditProduct = () => {
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
          className="h-52 object-cover w-full rounded-lg mt-4"
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
      const imageSrc = {
        image: `http://localhost:4000${src}`,
      };
      localStorage.setItem('image', JSON.stringify(imageSrc));
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

        <div className="rounded-lg border-2 border-base-300 py-24">
          <p className="text-center">
            Drag 'n' drop some files here, or click to select files
          </p>
          <BsCloudUpload className="text-3xl text-center mx-auto" />
        </div>

        <aside>{thumbs}</aside>
      </div>

      <div className="lg:col-span-4 lg:pl-4">
        <EditProductForm />
      </div>
    </section>
  );
};
export default EditProduct;
