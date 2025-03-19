"use client";
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ARRIVAL_DATA, SELLING_DATA, SORTED_IMAGES_DATA } from '../../../utils/helper';
import Header from '@/components/common/Header';
import YouMightBeLike from '@/components/detail-page/YouMightBeLIke';
import LatestOffer from '@/components/LatestOffer';
import TabComponent from '@/components/detail-page/RatingDetails';

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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!item) return <p className="text-center text-xl font-bold">Product not found</p>;
  const modifiedImages = [
    { image: item.image, alt: item.title },
    ...SORTED_IMAGES_DATA.slice(1, 3)
  ];

  const colors = ['#4E5D48', '#2E2F35', '#1E293B'];
  const sizes = ['Small', 'Medium', 'Large', 'X-Large'];

  return (
    <>
      <Header />
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-center items-center w-full max-xl:flex-col gap-10">
          <div className="flex  max-lg:flex-col-reverse gap-4">
            {/* Side Thumbnails */}
            <div className="flex md:flex-col gap-4">
              {modifiedImages.map((img, i) => (
                <Image
                  key={i}
                  src={img.image}
                  alt={img.alt}
                  width={152}
                  height={167}
                  className={`rounded-[20px] cursor-pointer max-md:w-[111px] max-md:h-[106px] ${selectedImageIndex === i ? 'border border-black' : ''}`}
                  onClick={() => setSelectedImageIndex(i)}
                />
              ))}
            </div>
            <Image
              src={modifiedImages[selectedImageIndex].image}
              alt={modifiedImages[selectedImageIndex].alt}
              width={444}
              height={530}
              className="rounded-xl"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold">{item.title}</h1>
            <div className="flex items-center mt-2">
              <Image src="/assets/images/svg/5star.svg" alt="Star" width={104} height={19} />
              <span className="ml-2 text-gray-500 text-sm">{item.rating}/5</span>
            </div>
            <p className="text-[32px] mt-4 font-bold">
              ${item.price}
              {item.originalPrice && <span className="line-through font-bold text-black/30 ml-2">${item.originalPrice}</span>}
              {item.discount && <span className="text-red-500 py-[6px] w-[58px] h-[28px] px-[13px] rounded-full text-sm ml-2 bg-[#FF3333]/10">{item.discount}</span>}
            </p>
            <p className='font-normal text-base text-black/40 md:max-w-[590px] border-b border-black/10 pb-6'>This {item.title} which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.</p>
            <p className="text-lg mt-6">Select Colors</p>
            <div className="flex gap-3 mt-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === color && (
                    <span className="text-white text-xl font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
            <p className="text-lg mt-6">Choose Size</p>
            <div className="flex flex-wrap gap-3 mt-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-6 rounded-full cursor-pointer ${selectedSize === size ? 'bg-black text-white' : 'bg-gray-200'}`}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className='flex max-md:flex-col gap-5'>
              <div className="flex items-center justify-center mt-6 gap-[38px] bg-gray-200 px-5 py-2 rounded-full w-[170px]">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-3xl font-semibold rounded-full cursor-pointer">-</button>
                <span className='font-medium text-base'>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-xl font-bold cursor-pointer">+</button>
              </div>
              <button className="mt-6 bg-black text-white py-3 lg:px-[157px] px-16 rounded-full cursor-pointer whitespace-nowrap">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <TabComponent/>
      <YouMightBeLike />
      <LatestOffer />
    </>
  );
};

export default ProductDetail;
