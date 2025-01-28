'use client';
import { useProductStore } from '@/components/Products/store/useProductStore';
import Image from 'next/image';
import { setuid } from 'process';
import { useState } from 'react';

const BasicProductsDetails = () => {
  const {
    productName,
    setProductName,
    productTitle,
    unit,
    subType,
    setUnit,
    productImage,
    setProductTitle,
    setProductImage, setSubType,  setDesign, design
  } = useProductStore();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      const formData = new FormData();
      formData.append('ecommerce', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      reader.onloadend = () => {
        const imageUrl = reader.result;
        setImagePreview(imageUrl);
        setProductImage(data?.imageUrl);
      };
      reader.readAsDataURL(file); // Read the file as a data URL (base64 string)
    }
  };
const handleProductNameChange = (e) => {
  setProductName(e.target.value)
};
const handleProductTitleChange = (e) => {
  setProductTitle(e.target.value)
};
const handleUnitChange = (e)  => {
  setUnit(e.target.value)
};
const handleSubTypeChange = (e) => {
  setSubType(e.target.value)
}
  const handleChangeDesign = (e) => {
    setDesign(e.target.value)
  };



  return (
    <div>
      <div className='grid grid-cols-3 space-x-2 m-4 ' >
        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            {'Product Name'}
            <span className="text-red">*</span>
          </label>
          <input
            type='text'
            value={productName}
            onChange={handleProductNameChange}
            placeholder={'Enter the product name'}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            {'Product Title'}
            <span className="text-red">*</span>
          </label>
          {console.log(productName)}
          <input
            type='text'
            value={productTitle}
            placeholder={'Enter the product title'}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            onChange={handleProductTitleChange}
          />
        </div>

        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            {'Product Unit'}
            <span className="text-red">*</span>
          </label>
          <input
            type='text'
            value={unit}
            placeholder={'Enter the product unit'}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            onChange={handleUnitChange}
          />
        </div>

        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            {'Sub Type'}
            <span className="text-red">*</span>
          </label>
          <input
            type='text'
            value={subType}
            placeholder={'Enter the Sub Type Category'}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            onChange={handleSubTypeChange}
          />
        </div>

        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            {'Card Design'}
            <span className="text-red">*</span>
          </label>
          <select
            value={design}
            onChange={handleChangeDesign}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          >
            <option value="in-stock">simple</option>
            <option value="out-of-stock">round</option>
          </select>
        </div>
      </div>

      <div className='w-[75%] m-4'>
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          Product Image
        </label>
        <input
          type="file"
          accept="image/*"
          className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
          onChange={handleImageChange} // Handle image upload
        />

        {/* Show the image preview if the image is selected */}
        {imagePreview && (
          <div className="mt-4">
            <Image
              src={imagePreview}
              width={350}
              height={300}
              alt="Product Preview"
              className="w-full rounded-[7px] shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BasicProductsDetails;
