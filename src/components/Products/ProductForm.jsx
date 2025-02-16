'use client';

import { useProductStore } from "./store/useProductStore";

const ProductForm = () => {
    const { productType,
        setProductType,
        description,
        screenSize,
        colors,
        screenResolution,
        maxResolution,
        processor,
        graphics,
        wirelessType,
        tags,
        sellCount,
        quantity,
        isFeatured,
        setDescription,
        setScreenSize,
        setColors,
        setScreenResolution,
        setMaxResolution,
        setProcessor,
        setGraphics,
        setWirelessType,
        setTags,
        setSellCount,
        setQuantity,
        setIsFeatured,
        productWidth,
        productLength,
        setProductWidth,
        setProductLength,
        subType,
        setSubType

    } = useProductStore();

    const handleSubTypeChange = (e) => {
        setSubType(e.target.value)
    }


    return (
        <div className="m-4">
            <h2 className="text-xl font-semibold mb-4 text-dark dark:text-white ">Product Information</h2>

            {/* Product Type */}
            <div className="mb-4">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    {'Product Type'}
                    <span className="text-red">*</span>
                </label>
                <input
                    type='text'
                    value={productType}  // Bind to Zustand state
                    onChange={(e) => setProductType(e.target.value)}  // Update state on input change
                    placeholder="Enter product type"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    required
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

            <div className="mb-4">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    {'Description'}
                    <span className="text-red">*</span>
                </label>
                <input
                    type="text"
                    value={description}  // Bind to Zustand state
                    onChange={(e) => setDescription(e.target.value)}  // Update state on input change
                    placeholder="Enter product description"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    required
                />
            </div>



            <h3 className="text-lg font-medium text-dark dark:text-white ">Additional Information</h3>
            <div className=" grid-cols-4 gap-3 hidden ">

                <div className="mb-4">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Standing Screen Display Size'}
                        <span className="text-red">*</span>
                    </label>
                    <input
                        type="text"
                        value={screenSize}
                        onChange={(e) => setScreenSize(e.target.value)}
                        placeholder="Enter screen size"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Colors'}
                        <span className="text-red">*</span>
                    </label>
                    <input
                        type="text"
                        value={colors}
                        onChange={(e) => setColors(e.target.value)}
                        placeholder="Enter colors"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Screen Resolution'}
                        <span className="text-red">*</span>
                    </label>
                    <input
                        type="text"
                        value={screenResolution}
                        onChange={(e) => setScreenResolution(e.target.value)}
                        placeholder="Enter screen resolution"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Max Screen Resolution'}
                        <span className="text-red">*</span>
                    </label>
                    <input
                        type="text"
                        value={maxResolution}
                        onChange={(e) => setMaxResolution(e.target.value)}
                        placeholder="Enter max screen resolution"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Processor'}
                        <span className="text-red">*</span>
                    </label>
                    <input
                        type="text"
                        value={processor}
                        onChange={(e) => setProcessor(e.target.value)}
                        placeholder="Enter processor details"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Graphics Coprocessor'}
                        <span className="text-red">*</span>
                    </label>
                    <input
                        type="text"
                        value={graphics}
                        onChange={(e) => setGraphics(e.target.value)}
                        placeholder="Enter graphics coprocessor"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Wireless Type'}
                        <span className="text-red">*</span>
                    </label>
                    <input
                        type="text"
                        value={wirelessType}
                        onChange={(e) => setWirelessType(e.target.value)}
                        placeholder="Enter wireless type"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
                <div className="mb-4">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Quantity'}
                        <span className="text-red">*</span>
                    </label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter the product quantity"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        required
                    />
                </div>

                <div className="mb-4  ">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Tags'}
                        <span className="text-red">*</span>
                    </label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Enter tags"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        required
                    />
                </div>

                <div className="mb-4 hidden ">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Sell Count'}
                        <span className="text-red">*</span>
                    </label>
                    <input
                        type="number"
                        value={sellCount}
                        onChange={(e) => setSellCount(e.target.value)}
                        placeholder="Enter sell count"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        required
                    />
                </div>

                <div className="mb-4 hidden ">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Featured'}
                    </label>
                    <input
                        type="text"
                        checked={isFeatured}
                        onChange={() => setIsFeatured(!isFeatured)}
                        className="w-6 h-6 text-primary-500 border-gray-300 focus:ring-primary-500"
                    />
                </div>

             {/* Width Input */}
             <div className="mb-4">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Width'}
                        <span className="text-red">*</span>
                    </label>
                    <input
                        type="text"
                        value={productWidth}
                        onChange={(e) => setProductWidth(e.target.value)}
                        placeholder="Enter width (e.g., 5m, 10cm)"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        required
                    />
                </div>

                {/* Length Input */}
                <div className="mb-4">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Length'}
                        <span className="text-red">*</span>
                    </label>
                    <input
                        type="text"
                        value={productLength}
                        onChange={(e) => setProductLength(e.target.value)}
                        placeholder="Enter length (e.g., 2m, 30cm)"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductForm;



// 'use client';

// import { useProductStore } from "./store/useProductStore";

// const ProductForm = () => {
//     const {
//         // ... other existing state variables ...
//         productWidth,
//         productLength,
//         setProductWidth,
//         setProductLength,
//         // ... rest of the state variables ...
//     } = useProductStore();

//     // ... other existing handlers ...

//     return (
//         <div className="m-4">
//             {/* ... existing form elements ... */}

//             <div className="grid grid-cols-4 gap-3">
//                 {/* ... other existing fields in the grid ... */}

               

//                 {/* ... rest of the existing grid content ... */}
//             </div>
//         </div>
//     );
// };

// export default ProductForm;