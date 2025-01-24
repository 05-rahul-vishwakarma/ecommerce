// 'use client';
// import { useProductStore } from '@/components/Products/store/useProductStore';
// import axios from 'axios';
// import Image from 'next/image';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

// const BasicProductsDetails = () => {
//     const router = useRouter();
//     const {id, data} = router.query;
//     const {
//         productName,
//         setProductName,
//         productTitle,
//         setProductTitle,
//         setUnit,
//         setProductImage, setSubType, subType, setDesign, design
//     } = useProductStore();
// const [product, setProduct] = useState(null);
//     const [imagePreview, setImagePreview] = useState(null);

//     const handleImageChange = async (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();

//             const formData = new FormData();
//             formData.append('ecommerce', file);

//             const response = await fetch('/api/upload', {
//                 method: 'POST',
//                 body: formData,
//             });

//             const data = await response.json();

//             reader.onloadend = () => {
//                 const imageUrl = reader.result;
//                 setImagePreview(imageUrl);
//                 setProductImage(data?.imageUrl);
//             };
//             reader.readAsDataURL(file); // Read the file as a data URL (base64 string)
//         }
//     };

//     const handleChangeDesign = (e) => {
//         setDesign(e.target.value)
//     }

//     console.log(design);
//     useEffect(() => {
//         if(router.isReady && data) {
//             setProduct(JSON.parse(decodeURIComponent(data)));
//         }
//     }, [router.isReady, data]);
//      if(!product){
//         return <div>Loading Product details.....</div>
//      }

//     return (
//         <div>
//             <div className='grid grid-cols-3 space-x-2 m-4 ' >
//                 <div>
//                     <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
//                         {'Product Name'}
//                         <span className="text-red">*</span>
//                     </label>
//                     <input
//                         type='text'
//                         value={productName}
//                         placeholder={'Enter the product name'}
//                         className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
//                         onChange={(e) => setProductName(e.target.value)}
//                     />
//                 </div>

//                 <div>
//                     <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
//                         {'Product Title'}
//                         <span className="text-red">*</span>
//                     </label>
//                     {console.log(productName)}
//                     <input
//                         type='text'
//                         value={productTitle}
//                         placeholder={'Enter the product title'}
//                         className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
//                         onChange={(e) => setProductTitle(e.target.value)}
//                     />
//                 </div>

//                 <div>
//                     <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
//                         {'Product Unit'}
//                         <span className="text-red">*</span>
//                     </label>
//                     <input
//                         type='text'
//                         placeholder={'Enter the product unit'}
//                         className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
//                         onChange={(e) => setUnit(e.target.value)}
//                     />
//                 </div>

//                 <div>
//                     <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
//                         {'Sub Type'}
//                         <span className="text-red">*</span>
//                     </label>
//                     <input
//                         type='text'
//                         placeholder={'Enter the Sub Type Category'}
//                         className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
//                         onChange={(e) => setSubType(e.target.value)}
//                     />
//                 </div>

//                 <div>
//                     <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
//                         {'Card Design'}
//                         <span className="text-red">*</span>
//                     </label>
//                     <select
//                         value={design}
//                         onChange={handleChangeDesign}
//                         className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
//                     >
//                         <option value="in-stock">simple</option>
//                         <option value="out-of-stock">round</option>
//                     </select>
//                 </div>
//             </div>

//             <div className='w-[75%] m-4'>
//                 <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
//                     Product Image
//                 </label>
//                 <input
//                     type="file"
//                     accept="image/*"
//                     className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
//                     onChange={handleImageChange} // Handle image upload
//                 />

//                 {/* Show the image preview if the image is selected */}
//                 {imagePreview && (
//                     <div className="mt-4">
//                         <Image
//                             src={imagePreview}
//                             width={350}
//                             height={300}
//                             alt="Product Preview"
//                             className="w-full rounded-[7px] shadow-lg"
//                         />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default BasicProductsDetails;

"use client";
import { useProductStore } from "@/components/Products/store/useProductStore";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
const BasicProductsDetails = (productName) => {
  console.log(productName);
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const {
    setProductName,

    setProductTitle,
    setUnit,
    setProductImage,
    setSubType,
    subType,
    setDesign,
    design,
  } = useProductStore();

  const [imagePreview, setImagePreview] = useState(null);

  // useEffect(() => {
  //     if (productId) {
  //         // Fetch product details from API based on ID
  //         axios.get(`/api/Products/${productId}`)
  //             .then((response) => {
  //                 setProductName(response.data.productName);
  //                 setProductTitle(response.data.productTitle);
  //                 setUnit(response.data.unit);
  //                 setSubType(response.data.subType);
  //                 setDesign(response.data.design);
  //                 setProductImage(response.data.imageUrl);
  //                 setImagePreview(response.data.imageUrl);
  //             })
  //             .catch((error) => {
  //                 console.error('Error fetching product:', error);
  //             });
  //     }
  // }, [productId]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      const formData = new FormData();
      formData.append("ecommerce", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        reader.onloadend = () => {
          const imageUrl = reader.result;
          setImagePreview(imageUrl);
          setProductImage(data?.imageUrl);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  const handleChangeDesign = (e) => {
    setDesign(e.target.value);
  };

  return (
    <div>
      <div className="m-4 grid grid-cols-3 space-x-2">
        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            {"Product Name"} <span className="text-red">*</span>
          </label>
          <input
            type="text"
            placeholder={"Enter the product name"}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition"
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            {"Product Title"} <span className="text-red">*</span>
          </label>
          <input
            type="text"
            placeholder={"Enter the product title"}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition"
            onChange={(e) => setProductTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            {"Product Unit"} <span className="text-red">*</span>
          </label>
          <input
            type="text"
            placeholder={"Enter the product unit"}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition"
            onChange={(e) => setUnit(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            {"Sub Type"} <span className="text-red">*</span>
          </label>
          <input
            type="text"
            value={subType}
            placeholder={"Enter the Sub Type Category"}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition"
            onChange={(e) => setSubType(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            {"Card Design"} <span className="text-red">*</span>
          </label>
          <select
            value={design}
            onChange={handleChangeDesign}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition"
          >
            <option value="in-stock">simple</option>
            <option value="out-of-stock">round</option>
          </select>
        </div>
      </div>

      <div className="m-4 w-[75%]">
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          Product Image
        </label>
        <input
          type="file"
          accept="image/*"
          className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition"
          onChange={handleImageChange}
        />

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
};

export default BasicProductsDetails;
