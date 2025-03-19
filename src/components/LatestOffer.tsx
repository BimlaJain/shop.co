"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';

import Footer from './Footer';

const LatestOffer = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        if (inputEmail && isValidEmail(inputEmail)) {
            setMessage('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setMessage('Please enter your email address.');
            return;
        }

        if (!isValidEmail(email)) {
            setMessage('Please enter a valid email address.');
            return;
        }

        const templateParams = {
            email: email,
        };

        emailjs.send(
            'service_krvtb88',
            'template_nd92fqi',
            templateParams,
            'ACFWkn8tsi2tt71D6'
        )
            .then((response) => {
                console.log('Email successfully sent!', response);
                setMessage('Thank you for subscribing to our newsletter!');
                setEmail('');
            })
            .catch((error) => {
                console.error('Failed to send email:', error);
                setMessage('Oops! Something went wrong. Please try again later.');
            });
    };

    return (
        <div className='relative pt-20'>
            <div className="container bg-black rounded-[36px] lg:max-w-[992px] xl:max-w-[1280px] md:max-w-[694px] max-w-[600px] max-sm:max-w-[358px] mx-auto absolute top-[-2%] xl:left-[5%] lg:left-[2%] md:left-[5%] left-[2%]">
                <div className="flex justify-between max-lg:flex-wrap items-center py-9 xl:px-16 md:px-12 px-6 ">
                    <h3 className='font-bold xl:text-[40px] lg:text-4xl text-[32px] max-lg:pb-9 leading-[109%]  ff-integral text-white max-w-[551px]'>
                        STAY UPTO DATE ABOUT OUR LATEST OFFERS
                    </h3>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='flex items-center gap-3 md:py-3 py-[9px] px-4 bg-white rounded-full'>
                                <Image src='/assets/images/svg/email.svg' alt='email' width={20} height={20} />
                                <input
                                    type="email"
                                    placeholder='Enter your email address'
                                    className='text-black/40 font-normal outline-none text-base placeholder:text-black/40'
                                    value={email}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className='font-medium text-base md:py-[11px] py-[9px] cursor-pointer hover:bg-black hover:text-white border border-white transition-all duration-300 ease-linear md:px-[92px] px-[73px] mt-[14px] whitespace-nowrap bg-white rounded-full'
                            >
                                Subscribe to Newsletter
                            </button>
                            {message && <p className="text-white mt-4">{message}</p>}
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LatestOffer;