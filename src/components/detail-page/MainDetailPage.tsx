"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ARRIVAL_DATA, SELLING_DATA } from '../../utils/helper';

const ProductDetail = ({ params }: { params: { id: string } }) => {
    const allData = [...ARRIVAL_DATA, ...SELLING_DATA];
    const item = allData.find((p) => p.id === Number(params.id));

    if (!item) return <p className="text-center text-xl font-bold">Product not found</p>;

    return (
        <div className="container mx-auto py-10">
            <div className="flex gap-10">
                <Image src={item.image} alt={item.title} width={400} height={400} />
                <div>
                    <h1 className="text-4xl font-bold">{item.title}</h1>
                    <p className="text-2xl">${item.price} {item.originalPrice && <span className="line-through text-gray-400 ml-2">${item.originalPrice}</span>} {item.discount && <span className="text-red-500 ml-2">{item.discount}</span>}</p>
                    <p className="text-lg mt-4">Rating: {item.rating}/5 ⭐</p>
                    <button className="mt-6 bg-black text-white py-2 px-6 rounded-lg">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;