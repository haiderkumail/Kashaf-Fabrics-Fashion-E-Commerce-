'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ValidationRule, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { Product } from '@/lib/models/ProductModel';
import { formatId } from '@/lib/utils';

export default function ProductEditForm({ productId }: { productId: string }) {
  const { data: product, error } = useSWR(`/api/admin/products/${productId}`);
  const router = useRouter();

  const { trigger: updateProduct, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/products/${productId}`,
    async (url, { arg }) => {
      const res = await fetch(`${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success('Product updated successfully');
      router.push(`/product/${data.slug}`);
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<Product>({
    defaultValues: {
      colors: [],
      sizes: [],
      discount: 0,
    },
  });

  const [colors, setColors] = useState<{ name: string; imageUrl: string }[]>([]);
  const [sizesText, setSizesText] = useState('');

  useEffect(() => {
    if (!product) return;
    setValue('name', product.name);
    setValue('slug', product.slug);
    setValue('price', product.price);
    setValue('image', product.image);
    setValue('category', product.category);
    setValue('brand', product.brand);
    setValue('countInStock', product.countInStock);
    setValue('description', product.description);
    setValue('discount', product.discount || 0);
    setColors(product.colors || []);
    setSizesText((product.sizes || []).join(', '));
  }, [product, setValue]);

  const formSubmit = async (formData: any) => {
    const sizesArray = sizesText.split(',').map(s => s.trim()).filter(Boolean);
    await updateProduct({ ...formData, colors, sizes: sizesArray });
  };

  const handleColorChange = (index: number, key: 'name' | 'imageUrl', value: string) => {
    const updated = [...colors];
    updated[index][key] = value;
    setColors(updated);
  };

  const addColorField = () => {
    setColors([...colors, { name: '', imageUrl: '' }]);
  };

  const removeColorField = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  if (error) return error.message;
  if (!product) return 'Loading...';

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof Product;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className='mb-6 md:flex'>
      <label className='label md:w-1/5' htmlFor={id}>
        {name}
      </label>
      <div className='md:w-4/5'>
        <input
          type='text'
          id={id}
          {...register(id, {
            required: required && `${name} is required`,
            pattern,
          })}
          className='input input-bordered w-full max-w-md'
        />
        {errors[id]?.message && (
          <div className='text-error'>{errors[id]?.message}</div>
        )}
      </div>
    </div>
  );

  const uploadHandler = async (e: any) => {
    const toastId = toast.loading('Uploading image...');
    try {
      const resSign = await fetch('/api/cloudinary-sign', {
        method: 'POST',
      });
      const { signature, timestamp } = await resSign.json();
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await res.json();
      setValue('image', data.secure_url);
      toast.success('File uploaded successfully', {
        id: toastId,
      });
    } catch (err: any) {
      toast.error(err.message, {
        id: toastId,
      });
    }
  };

  return (
    <div>
      <h1 className='py-4 text-2xl'>Edit Product {formatId(productId)}</h1>
      <form onSubmit={handleSubmit(formSubmit)}>
        <FormInput name='Name' id='name' required />
        <FormInput name='Slug' id='slug' required />
        <FormInput name='Image' id='image' required />
        {/* <div className='mb-6 md:flex'>
          <label className='label md:w-1/5' htmlFor='imageFile'>
            Upload Image
          </label>
          <div className='md:w-4/5'>
            <input
              type='file'
              className='file-input w-full max-w-md'
              id='imageFile'
              onChange={uploadHandler}
            />
          </div>
        </div> */}
        <FormInput name='Price' id='price' required />
        <FormInput name='Category' id='category' required />
        <FormInput name='Brand' id='brand' required />
        <FormInput name='Description' id='description' required />
        <FormInput name='Count In Stock' id='countInStock' required />

        {/* NEW DISCOUNT FIELD */}
        <FormInput name='Discount (%)' id='discount' required={false} />

        <div className='mb-6 md:flex'>
          <label className='label md:w-1/5'>Colors</label>
          <div className='md:w-4/5 space-y-4 max-w-md'>
            {colors.map((color, index) => (
              <div key={index} className='flex gap-2 items-center'>
                <input
                  type='text'
                  placeholder='Color Name'
                  value={color.name}
                  onChange={e => handleColorChange(index, 'name', e.target.value)}
                  className='input input-bordered w-1/2'
                />
                <input
                  type='text'
                  placeholder='Image URL'
                  value={color.imageUrl}
                  onChange={e => handleColorChange(index, 'imageUrl', e.target.value)}
                  className='input input-bordered w-1/2'
                />
                <button
                  type='button'
                  onClick={() => removeColorField(index)}
                  className='btn btn-error btn-sm'
                >
                  X
                </button>
              </div>
            ))}
            <button
              type='button'
              className='btn btn-outline btn-sm'
              onClick={addColorField}
            >
              Add Color
            </button>
          </div>
        </div>

        <div className='mb-6 md:flex'>
          <label className='label md:w-1/5'>Sizes</label>
          <div className='md:w-4/5'>
            <input
              type='text'
              placeholder='e.g. S, M, L, XL'
              value={sizesText}
              onChange={e => setSizesText(e.target.value)}
              className='input input-bordered w-full max-w-md'
            />
          </div>
        </div>

        <button
          type='submit'
          disabled={isUpdating}
          className='btn btn-primary'
        >
          {isUpdating && <span className='loading loading-spinner'></span>}
          Update
        </button>
        <Link className='btn ml-4 ' href='/admin/products'>
          Cancel
        </Link>
      </form>
    </div>
  );
}
