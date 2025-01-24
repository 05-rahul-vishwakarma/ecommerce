'use client';
import { useProductStore } from "../Products/store/useProductStore";

const ProductForm = () => {
    const { productType,
        setProductType,
        productName,
        productTitle,
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
        setProductName,
        setProductTitle,
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
        productMeter,
        setProductWidth,
        setProductMeter,
    } = useProductStore();

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
            <div className="grid grid-cols-4 gap-3 hidden ">

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

                <div className="mb-4">
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

                <div className="mb-4">
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

                <div className="mb-4">
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

                <div className="mb-4">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Product Size In Width'}
                    </label>
                    <input
                        type="text"
                        value={productWidth}
                        onChange={(e) => setProductWidth(e.target.value)}
                        className="w-full rounded-[7px] capitalize border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        required
                        placeholder="enter the product size in width"
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Product Size In Meter'}
                    </label>
                    <input
                        type="text"
                        placeholder="Enter The product size in meter"
                        value={productMeter}
                        onChange={(e) => setProductMeter(e.target.value)}
                        className="w-full capitalize rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
