"use client"
import React, { useEffect, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { HEADER_LIST, SHOP_DATA } from '@/utils/helper';
import { usePathname } from 'next/navigation';

const Header = () => {
    const [showBanner, setShowBanner] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const pathname = usePathname();

    const updateCartCount = () => {
        type CartItem = { quantity: number };
        const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalItems);
    };

    useEffect(() => {
        // Check if banner was dismissed
        const bannerState = localStorage.getItem('bannerDismissed');
        if (bannerState === 'true') {
            setShowBanner(false);
        }

        updateCartCount();

        // Listen for custom event for cart updates
        const handleCartUpdate = () => updateCartCount();
        window.addEventListener('cartUpdate', handleCartUpdate);

        return () => {
            window.removeEventListener('cartUpdate', handleCartUpdate);
        };
    }, []);

    const handleCloseBanner = () => {
        setShowBanner(false);
        localStorage.setItem('bannerDismissed', 'true');
    };

    return (
        <div>
            {showBanner && (
                <div className='bg-black'>
                    <div className="text-white md:text-center py-2 flex container px-4 mx-auto">
                        <span className='md:text-sm text-xs text-right font-normal'>
                            Sign up and get 20% off on your first order.{' '}
                            <Link href="#" className="underline font-medium">
                                Sign Up Now
                            </Link>
                        </span>
                        <button onClick={handleCloseBanner} className="absolute right-4 top-2">
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}

            <header className="flex justify-between items-center p-4 container mx-auto">
                <div className="flex items-center gap-4">
                    <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <Image src="/assets/images/svg/menuicon.svg" alt="menu" width={24} height={24} />
                    </button>
                    <Link href="/">
                        <h2 className="text-[30px] ff-integral font-bold">SHOP.CO</h2>
                    </Link>
                </div>

                <nav className={`flex gap-6 lg:flex ${isMobileMenuOpen ? 'fixed top-0 left-0 w-full min-h-screen bg-white flex-col justify-center items-center z-50 ' : 'hidden lg:flex'} `}>
                    <button className="absolute top-8 left-4 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
                        <X size={24} />
                    </button>
                    <div className="relative">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-1 cursor-pointer">
                            Shop <ChevronDown size={16} />
                        </button>
                        {isDropdownOpen && (
                            <ul className="absolute top-8 left-0 w-40 bg-black shadow-lg border rounded-md">
                                {SHOP_DATA.map((item: string, index: number) => (
                                    <li key={index} onClick={() => setIsDropdownOpen(false)} className="p-2 hover:bg-gray-800 text-white cursor-pointer">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {HEADER_LIST.map((link: any, index: number) => (
                        <Link
                            key={index}
                            href={link.link}
                            className={`relative group ${pathname === link.link ? 'underline font-bold' : ''}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="group-hover:underline">{link.title}</span>
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-5">
                    <div className="relative w-full xl:w-[577px] hidden lg:block">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-full pl-11 pr-4 py-3 rounded-full bg-gray-100 focus:outline-none"
                        />
                        <Image src="/assets/images/svg/search.svg" alt="search" width={24} height={24} className='absolute top-3 left-3 cursor-pointer' />
                    </div>
                    <div className='flex gap-3'>
                        <Image src="/assets/images/svg/searchblack.svg" alt="search" width={24} height={24} className='max-lg:block hidden' />
                        <Link href="/card" className="relative cursor-pointer">
                            <Image src="/assets/images/svg/addtocard.svg" alt="cart" width={24} height={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
