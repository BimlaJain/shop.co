import React from 'react';
import Image from 'next/image';
import { DRESS_STYLES } from '@/utils/helper';
import CommonHeading from './common/CommonHeading';


const DressStyle = () => {
    return (
        <section className=" px-4">
            <div className="container mx-auto bg-gray-100 md:px-[64px] px-6 md:py-[73px] pt-10 pb-7 md:rounded-[40px] rounded-[20px]">
                <CommonHeading text="BROWSE BY DRESS STYLE" myClass="md:!mb-[64px] !mb-7" />
                
                    <div className="flex flex-col sm:flex-row justify-center gap-5">
                    <Image src="/assets/images/png/casual.png" alt="casual" width={407} height={289} className='max-sm:w-[310px] max-sm:h-[190px]' />
                    <Image src="/assets/images/png/formal.png" alt="casual" width={684} height={289} className='max-sm:w-[310px] max-sm:h-[190px]' />
                </div>
                <div className="flex justify-center flex-col sm:flex-row gap-5 mt-5">
                    <Image src="/assets/images/png/party-girl.png" alt="casual" width={684} height={289} className='max-sm:w-[310px] max-sm:h-[190px]' />
                    <Image src="/assets/images/png/gym.png" alt="casual" width={407} height={289} className='max-sm:w-[310px] max-sm:h-[190px]' />
                </div>
                </div>
        </section>
    );
};

export default DressStyle;
