import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_SECTIONS_LIST, PAYMENT_METHODS, SOCIAL_LINKS } from "../utils/helper";
const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div className="bg-[#F0F0F0] lg:pt-[140px] pt-28 md:pb-[81px] pb-[77px]">
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
                            {SOCIAL_LINKS.map((link, index) => (
                                <Link key={index} className='bg-white border rounded-full size-[28px] border-[#00000033] group hover:bg-black transition-all duration-700 flex items-center justify-center' href={link.href} target="_blank">
                                    <Image className="group-hover:invert group-hover:brightness-0 transition-all duration-700" src={link.icon} alt={link.alt} width={link.width} height={link.height} />
                                </Link>
                            ))}
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
                    <div className="flex gap-2 max-md:mt-6">
                        {PAYMENT_METHODS.map((method, index) => (
                            <Link key={index} href={method.link} className="w-full cursor-pointer hover:shadow-lg">
                                <Image src={method.icon} alt={method.name} width={46} height={30} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;