"use client";
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ARRIVAL_DATA, SELLING_DATA } from '../../../utils/helper';

const ProductDetail = ({ params }: { params: Promise<{ title: string }> }) => {
  const unwrappedParams = use(params);
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    const slug = decodeURIComponent(unwrappedParams.title);
    const formattedSlug = slug.replace(/-/g, ' ').toLowerCase();
    const allData = [...ARRIVAL_DATA, ...SELLING_DATA];
    const foundItem = allData.find((p) => p.title.toLowerCase() === formattedSlug);
    setItem(foundItem);
  }, [unwrappedParams]);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('Large');
  const [quantity, setQuantity] = useState(1);

  if (!item) return <p className="text-center text-xl font-bold">Product not found</p>;

  const colors = ['#4E5D48', '#2E2F35', '#1E293B'];
  const sizes = ['Small', 'Medium', 'Large', 'X-Large'];

  return (
    <div className="container mx-auto py-10">
      <div className="flex gap-10">
        <div className="flex flex-col gap-4">
          <Image src={item.image} alt={item.title} width={400} height={400} className="rounded-xl" />
          <div className="flex gap-4">
            {[...Array(3)].map((_, i) => (
              <Image key={i} src={item.image} alt={item.title} width={80} height={80} className="rounded-xl cursor-pointer" />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold">{item.title}</h1>
          <div className="flex items-center mt-2">
            <Image src="/assets/images/svg/5star.svg" alt="Star" width={104} height={19} />
            <span className="ml-2 text-gray-500 text-sm">{item.rating}/5</span>
          </div>
          <p className="text-2xl mt-4">
            ${item.price}
            {item.originalPrice && <span className="line-through text-gray-400 ml-2">${item.originalPrice}</span>}
            {item.discount && <span className="text-red-500 ml-2">{item.discount}</span>}
          </p>

          <p className="text-lg mt-6">Select Colors</p>
          <div className="flex gap-3 mt-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full ${selectedColor === color ? 'border-4 border-black' : ''}`}
                style={{ backgroundColor: color }}
              ></button>
            ))}
          </div>

          <p className="text-lg mt-6">Choose Size</p>
          <div className="flex gap-3 mt-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 px-6 rounded-full ${selectedSize === size ? 'bg-black text-white' : 'bg-gray-200'}`}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="flex items-center mt-6 gap-4">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="bg-gray-200 px-4 py-2 rounded-full">-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="bg-gray-200 px-4 py-2 rounded-full">+</button>
          </div>

          <button className="mt-6 bg-black text-white py-3 px-16 rounded-full">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
