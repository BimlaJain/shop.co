"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LatestOffer from '../LatestOffer';
import Header from '../common/Header';
import CommonHeading from '../common/CommonHeading';

interface CartItem {
    name: string;
    price: number;
    quantity: number;
    image: string;
    size: string;
    color: string;
}

const CartPage: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const router = useRouter();

    const updateCart = (newCart: CartItem[]) => {
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        window.dispatchEvent(new Event('cartUpdate'));
    };

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(storedCart);
    }, []);

    const handleQuantityChange = (index: number, delta: number) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + delta);
        updateCart(updatedCart);
    };

    const handleRemove = (index: number) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        updateCart(updatedCart);
    };

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = subtotal * 0.2;
    const deliveryFee = 15;
    const total = subtotal - discount + deliveryFee;

    return (
        <>
            <Header />
            <div className="container mx-auto pt-10 pb-24 px-4">
              <CommonHeading text="Your Cart" myClass="!mb-[40px] !text-left !text-[40px]" />
                <div className="flex max-lg:flex-col gap-10">
                    <div className="lg:w-7/12 w-full border border-black/10 px-6 rounded-[20px]">
                        {cart.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            cart.map((item, index) => (
                                <div key={index} className="flex items-center justify-between border-b border-black/10 py-6">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={item.image || '/assets/images/png/green-t-shirt.png'}
                                            alt={item.name || 'Product Image'}
                                            width={100}
                                            height={100}
                                            className="rounded-md"
                                        />

                                        <div>
                                            <h2 className="md:text-xl text-base font-bold whitespace-nowrap max-sm:mt-7">{item.name}</h2>
                                            <p className='text-xs md:text-base'>Size: {item.size}</p>
                                            <p className='text-xs md:text-base'>Color: {item.color}</p>
                                            <p className="font-bold text-xl md:text-2xl">${item.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-end items-end ">
                                        <button onClick={() => handleRemove(index)} className="text-red-500 mb-14">
                                            <Image src="/assets/images/svg/deletebutton.svg" alt="trash" width={24} height={24} />
                                        </button>
                                        <div className='bg-[#F0F0F0] rounded-full gap-5 md:h-[44px] h-[31px] max-sm:w-[105px] flex items-center'>
                                            <button onClick={() => handleQuantityChange(index, -1)} className="pl-5 py-3 text-2xl font-bold">-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => handleQuantityChange(index, 1)} className="pr-5 py-3 text-2xl font-bold">+</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="lg:w-5/12 max-lg:w-full px-6 py-5 border border-black/10 rounded-[20px] h-[458px]">
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                        <p className='flex justify-between mb-5'>Subtotal <span className="font-bold">${subtotal}</span></p>
                        <p className='flex justify-between mb-5'>Discount (-20%)<span className="text-red-500">-${discount.toFixed(2)}</span></p>
                        <p className='flex justify-between mb-5'>Delivery Fee<span className="font-bold">${deliveryFee}</span></p>
                        <hr className="my-4 border-black/10" />
                        <p className="text-xl font-bold flex justify-between mb-6">Total <span>${total.toFixed(2)}</span></p>

                        <div className="mb-6 flex gap-3 items-center justify-center">
                            <div className='flex bg-[#F0F0F0] gap-3 rounded-full py-3 md:px-4 px-2 items-center w-full mt-3'>
                                <Image src="/assets/images/svg/promocode.svg" alt="promo" width={24} height={24} />
                                <input type="text" placeholder="Add promo code" className="w-full rounded-full md:text-base text-sm" />
                            </div>
                            <button className="px-[38px] bg-black text-white py-3 mt-3 rounded-full">Apply</button>
                        </div>

                        <button className="w-full bg-black text-white py-3 rounded-full">Go to Checkout →</button>
                    </div>
                </div>
            </div>
            <LatestOffer />
        </>
    );
};

export default CartPage;