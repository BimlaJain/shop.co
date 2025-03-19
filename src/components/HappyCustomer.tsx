"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { HAPPY_CUSTOMER_DATA } from '@/utils/helper';
import CommonHeading from './common/CommonHeading';

const HappyCustomer = () => {
    return (
        <section className="pt-16 pb-20">
            <div className="container mx-auto px-4">

                <CommonHeading text="OUR HAPPY CUSTOMERS" myClass="!mb-[40px] !text-left" />
                <div className="relative">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={1}
                        loop={true}
                        centeredSlides={true}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            1024: { slidesPerView: 2 },
                            1280: { slidesPerView: 3.5 },
                        }}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev'
                        }}
                        className="blur-effect"
                    >
                        {HAPPY_CUSTOMER_DATA.map((testimonial, index) => (
                            <SwiperSlide key={index} className="transition-transform duration-300">
                                <div className="md:py-7 md:px-8 p-6 bg-white rounded-[20px] border border-black/10 hover:shadow-lg md:h-[239px] h-[186px]">
                                    <div className="flex items-center md:mb-3 mb-1">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <span key={i} className="text-yellow-500 text-xl mr-[5px]">★</span>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-bold md:mb-2 mb-1 flex">{testimonial.name}  <Image src="/assets/images/svg/greentick.svg" alt="green-tic" width={24} height={24} /></h3>
                                    <p className="text-gray-600 md:text-base text-sm">{testimonial.text}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <button className="swiper-button-prev absolute xl:!left-[94%] lg:!left-[92%] md:!left-[90%] !left-[80%] !top-[-15%] transform -translate-y-1/2  z-10">
                        <Image src="/assets/images/svg/left-arrow.svg" alt="Prev" width={24} height={24} />
                    </button>
                    <button className="swiper-button-next absolute right-0 !top-[-15%] transform -translate-y-1/2  z-10">
                        <Image src="/assets/images/svg/right-arrow.svg" alt="Next" width={24} height={24} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HappyCustomer;
