import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_SECTIONS_LIST } from "../utils/helper";
const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div className="bg-[#F0F0F0] lg:pt-[140px] pt-[218px] md:pb-[81px] pb-[77px]">
            <div className="container max-w-[1240px] mx-auto px-4">
                <div className="flex flex-wrap justify-between md:gap-10 gap-6 pb-[50px]">
                    <div className="max-w-[248px]">
                        <Link href="#">
                            <h2 className="font-bold ff-integral md:text-[33.45px] text-[28.85px] text-black">SHOP.CO</h2>
                        </Link>
                        <p className="font-normal text-sm leading-[22px] pt-[14px] md:pb-[35px] pb-5 text-black/60">
                            We have clothes that suit your style and which you’re proud to wear. From women to men.
                        </p>
                        <div className="cursor-pointer gap-3 flex">
                            <Link className='bg-white border rounded-full size-[28px] border-[#00000033] flex items-center justify-center' href="https://x.com/?lang=en" target="_blank">
                                <Image className=" hover:scale-110 transition-all duration-700 " src="/assets/images/svg/twitter.svg" alt="twitter" width={11.17} height={9.03} />
                            </Link>
                            <Link className='bg-black rounded-full size-[28px] flex items-center justify-center' href="https://www.facebook.com/" target="_blank">
                                <Image className="hover:scale-110 transition-all duration-700" src="/assets/images/svg/facebook.svg" alt="telegram" width={6.32} height={12.17} />
                            </Link>
                            <Link className='bg-white border rounded-full size-[28px] border-[#00000033] flex items-center justify-center' href="https://www.instagram.com/" target="_blank">
                                <Image className="hover:scale-110 transition-all duration-700" src="/assets/images/svg/instagram.svg" alt="discord" width={13.54} height={13.54} />
                            </Link>
                            <Link className='bg-white border rounded-full size-[28px] border-[#00000033] flex items-center justify-center' href="https://github.com/" target="_blank">
                                <Image className="hover:scale-110 transition-all duration-700" src="/assets/images/svg/github.svg" alt="discord" width={12.95} height={12.65} />
                            </Link>
                        </div>
                    </div>
                    {NAV_SECTIONS_LIST.map(({ title, links }, index) => (
                        <div key={index}>
                            <h4 className="uppercase font-medium md:text-base text-sm leading-[18px] tracking-[3px] pb-[20px] text-black">
                                {title}
                            </h4>
                            <ul className="space-y-2">
                                {links.map((link, i) => (
                                    <li key={i}>
                                        <Link href="#" className="font-normal md:text-base text-sm text-[#00000099] hover:text-black transition-colors">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <p className="border w-full border-[#0000001A]"></p>
                <div className="flex flex-wrap md:justify-between justify-center pt-[25px]">
                    <p className=" mt-1 text-sm">
                        Shop.co © 2000-{year}, All Rights Reserved
                    </p>
                    <div className="flex md:gap-2 max-md:mt-6">
                        <Image src="/assets/images/svg/visa.svg" alt="visa" width={46.61} height={30.03} className="w-full"/>
                        <Image src="/assets/images/svg/circle.svg" alt="circle" width={46.61} height={30.03} className="w-full" />
                        <Image src="/assets/images/svg/paypal.svg" alt="paypal" width={46.61} height={30.03} className="w-full" />
                        <Image src="/assets/images/svg/pay.svg" alt="pay" width={46.61} height={30.03} className="w-full" />
                        <Image src="/assets/images/svg/google-pay.svg" alt="google-pay" width={46.61} height={30.03} className="w-full" />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;