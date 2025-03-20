"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ARRIVAL_DATA, SELLING_DATA, MIGHT_BE_LIKE_DATA, SORTED_IMAGES_DATA } from '../../../utils/helper';
import Header from '@/components/common/Header';
import YouMightBeLike from '@/components/detail-page/YouMightBeLIke';
import LatestOffer from '@/components/LatestOffer';
import TabComponent from '@/components/detail-page/RatingDetails';
type Product = {
  id: number;
  image: string;
  title: string;
  rating: number;
  price: number;
  originalPrice?: number;
  discount?: string;
  colors?: string[];
};

const ProductDetail = ({ params }: { params: Promise<{ title: string }> }) => {
  const router = useRouter();
  const [unwrappedParams, setUnwrappedParams] = useState<{ title: string } | null>(null);
  const [item, setItem] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('Large');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchParams = async () => {
      const result = await params;
      setUnwrappedParams(result);
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!unwrappedParams) return;

    const slug = decodeURIComponent(unwrappedParams.title);
    const formattedSlug = slug.replace(/-/g, ' ').toLowerCase();

    const allData = [...ARRIVAL_DATA, ...SELLING_DATA, ...MIGHT_BE_LIKE_DATA];
    const foundItem = allData.find((p: Product) => p.title.toLowerCase() === formattedSlug);

    if (foundItem) {
      setItem(foundItem);
      setSelectedColor((foundItem as Product).colors?.[0] ?? '');
    } else {
      setItem(null);
    }
  }, [unwrappedParams]);
  const handleAddToCart = () => {
    if (!selectedColor) {
      setAlertMessage('Please select a color.');
      return;
    }

    if (!selectedSize) {
      setAlertMessage('Please select a size.');
      return;
    }

    const cartItem = {
      id: item.id,
      image: item.image,  
      name: item.title,
      price: item.price,
      color: selectedColor,
      size: selectedSize,
      quantity,
    };

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cart.findIndex((cartItem: any) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex] = cartItem;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    router.push('/card');
  };

  const closeAlert = () => setAlertMessage('');

  if (!item) return <p className="text-center text-xl font-bold">Product not found</p>;

  const modifiedImages = [
    { image: item.image, alt: item.title },
    ...SORTED_IMAGES_DATA.slice(1, 3)
  ];

  const colors: string[] = item.colors || ['#4E5D48', '#2E2F35', '#1E293B'];
  const sizes = ['Small', 'Medium', 'Large', 'X-Large'];

  return (
    <>
      <Header />
      <div className="container mx-auto py-10 px-4">
        {alertMessage && (
          <div className="fixed top-5 right-5 bg-red-500 text-white px-6 py-4 rounded-lg z-50">
            {alertMessage}
            <button className="ml-4 font-bold" onClick={closeAlert}>✕</button>
          </div>
        )}
        <div className="flex justify-center items-center w-full max-xl:flex-col gap-10">
          <div className="flex max-lg:flex-col-reverse gap-4">
            <div className="flex lg:flex-col gap-4">
              {modifiedImages.map((img, i) => (
                <Image
                  key={i}
                  src={img.image}
                  alt={img.alt}
                  width={152}
                  height={167}
                  className={`rounded-[20px] cursor-pointer md:w-[152px] w-[111px] md:h-[167px] h-[106px] ${selectedImageIndex === i ? 'border border-black' : ''}`}
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
            <h1 className="text-4xl ff-integral font-bold">{item.title}</h1>
            <div className="flex items-center mt-2">
              <Image src="/assets/images/svg/5star.svg" alt="Star" width={104} height={19} />
              <span className="ml-2 text-gray-500 text-sm">{item.rating}/5</span>
            </div>
            <p className="text-[32px] mt-4 font-bold">${item.price}</p>

            <p className="text-lg mt-6">Select Colors</p>
            <div className="flex gap-3 mt-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    console.log("Selected Color:", color);
                    setSelectedColor(color);
                  }}
                  className={`w-8 h-8 rounded-full border cursor-pointer ${selectedColor === color ? 'border-black' : ''}`}
              style={{ backgroundColor: color }}
                >
              {selectedColor === color && <span className="text-white font-bold">✓</span>}
            </button>
              ))}
          </div>


            <p className="text-lg mt-6">Choose Size</p>
            <div className="flex  md:gap-3 gap-2 mt-2 border-b border-black/10 pb-6">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 md:px-6 px-5 whitespace-nowrap  rounded-full md:text-base text-sm cursor-pointer ${selectedSize === size ? 'bg-black text-white' : 'bg-gray-200'}`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="flex gap-5 mt-6">
              <div className="flex items-center mt-6 gap-4 bg-[#F0F0F0] rounded-full">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className=" px-4 py-2 text-2xl font-bold">-</button>
                <span className='font-medium text-base'>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className=" px-4 py-2 text-2xl font-bold">+</button>
              </div>

              <button onClick={handleAddToCart} className="bg-black cursor-pointer text-white py-3 mt-4 whitespace-nowrap md:px-[157px] px-16  rounded-full">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <TabComponent />
      <YouMightBeLike />
      <LatestOffer />
    </>
  );
};

export default ProductDetail;

            