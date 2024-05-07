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
    <section className="mt-4 grid gap-10 lg:grid-cols-12">
      <div
        {...getRootProps({ className: 'dropzone' })}
        className="rounded-lg p-12 grid lg:col-span-4 place-items-center border-2 border-base-300 lg:h-72"
      >
        <input {...getInputProps()} />

        <p className="text-center">
          Drag 'n' drop some files here, or click to select files
        </p>
        <BsCloudUpload className="text-3xl" />
      </div>

      <div className="col-span-8">
        <EditProductForm />

        <aside>{thumbs}</aside>
      </div>
    </section>
  );
};
export default EditProduct;
