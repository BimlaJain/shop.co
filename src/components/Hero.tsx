"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CommonButton from './common/Commonbutton';
import { COUNTER_DATA } from '@/utils/helper';

const HeroSection = () => {
    const [counts, setCounts] = useState(COUNTER_DATA.map(() => 0));

    useEffect(() => {
        const duration = 2000; 
        const intervalTime = 30; 
        const steps = duration / intervalTime;

        const intervals = COUNTER_DATA.map((item, index) => {
            const increment = item.number / steps;
            return setInterval(() => {
                setCounts((prevCounts) => {
                    const newCounts = [...prevCounts];
                    newCounts[index] = Math.min(newCounts[index] + increment, item.number);
                    return newCounts;
                });
            }, intervalTime);
        });

        setTimeout(() => {
            intervals.forEach((interval) => clearInterval(interval));
            setCounts(COUNTER_DATA.map(item => item.number)); 
        }, duration);

        return () => intervals.forEach((interval) => clearInterval(interval));
    }, []);

    return (
        <section className="bg-[#F2F0F1]">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:items-center relative">
                <div className="text-center lg:text-left xl:w-1/2  lg:pb-[116px] lg:pt-16 pt-10">
                    <h1 className="xl:text-[64px] lg:text-6xl md:text-[46px] text-4xl font-bold mb-4 text-left ff-integral leading-[100%] w-full">FIND CLOTHES THAT MATCH YOUR STYLE</h1>
                    <p className="text-black/60 text-left lg:max-w-[545px] md:mb-8 mb-6 md:text-base text-[13px] font-normal w-full">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
                    <CommonButton text="Shop Now" myClass="px-[68px] py-[13px] max-sm:!w-full" />
                    <div className="flex flex-wrap justify-center lg:justify-start xl:gap-10 gap-8 md:mt-12 mt-5">
                        {COUNTER_DATA.map((item, index) => (
                            <div key={index} className={`text-center ${index !== 0 ? 'border-l border-black/10 pl-8' : ''}`}>
                                <h3 className="text-[40px] max-sm:text-2xl font-bold text-left">{Math.round(counts[index]).toLocaleString()}+</h3>
                                <p className="text-gray-500 text-left md:text-base text-xs">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="xl:w-1/2  flex justify-center lg:mt-[290px] xl:mt-9">
                    <Image src="/assets/images/png/man-woman.png" alt="Models" width={750} height={663} className='max-lg:w-[400px]'/>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
