import { useState } from "react";

const sizes = ["10", "20", "30"];

const SizeSelector = () => {
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <div className="mt-4">
      <p className="text-lg font-semibold">Select Size:</p>
      <div className="flex gap-2 mt-2">
        {sizes.map((size) => (
          <button
            key={size}
            className={`px-4 py-2 rounded-lg border ${
              selectedSize === size
                ? "bg-blue-500 text-black border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setSelectedSize(size)}
          >
            {size}m
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
