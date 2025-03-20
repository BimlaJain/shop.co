"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { REVIEW_LIST } from '@/utils/helper';

const TabComponent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState('rating');
    const [sortOrder, setSortOrder] = useState('latest');
    const [visibleReviews, setVisibleReviews] = useState(3);

    const tabs = [
        { label: 'Product Details', value: 'product-details' },
        { label: 'Rating & Reviews', value: 'rating' },
        { label: 'FAQs', value: 'faqs' }
    ];

    useEffect(() => {
        const updateVisibleReviews = () => {
            setVisibleReviews(window.innerWidth >= 1024 ? 6 : 3);
        };
        updateVisibleReviews();
        window.addEventListener('resize', updateVisibleReviews);
        return () => window.removeEventListener('resize', updateVisibleReviews);
    }, []);

    const filterByDate = (reviewDate: string) => {
        const now = new Date();
        const reviewTime = new Date(reviewDate);
        const timeDiff = (now.getTime() - reviewTime.getTime()) / (1000 * 60 * 60 * 24);

        switch (sortOrder) {
            case '1day':
                return timeDiff <= 1;
            case '1week':
                return timeDiff <= 7;
            case '1month':
                return timeDiff <= 30;
            case 'latest':
                return true;
            case 'oldest':
                return true;
            default:
                return true;
        }
    };

    const sortedReviews = [...REVIEW_LIST]
        .filter((review) => filterByDate(review.date))
        .sort((a, b) => {
            return sortOrder === 'latest'
                ? new Date(b.date).getTime() - new Date(a.date).getTime()
                : new Date(a.date).getTime() - new Date(b.date).getTime();
        });

    const handleLoadMore = () => {
        setVisibleReviews((prev) => prev + (window.innerWidth >= 1024 ? 6 : 3));
    };

    useEffect(() => {
        const tab = searchParams.get('tab') || 'rating';
        setActiveTab(tab);
    }, [searchParams]);

    const handleTabChange = (tab:any) => {
        router.push(`?tab=${tab}`);
    };

    return (
        <div className="container mx-auto pt-10 px-4">
            <div className="flex justify-between text-center items-center gap-8 border-b border-black/10">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => handleTabChange(tab.value)}
                        className={`pb-2 text-center flex justify-center md:text-xl text-base whitespace-nowrap w-[414px] ${activeTab === tab.value ? 'border-b-2 border-black font-bold' : 'text-black/60'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="pt-6">
                {activeTab === 'rating' ? (
                    <div>
                        <div className="flex justify-between mt-[19px] mb-[29px]">
                            <h2 className="text-2xl font-bold">
                                All Reviews <span className="font-normal text-base text-[#00000099]"> ({sortedReviews.length})</span>
                            </h2>
                            <select
                                className="py-3 px-4 outline-none rounded-full bg-[#F0F0F0] cursor-pointer"
                                onChange={(e) => setSortOrder(e.target.value)}
                                value={sortOrder}
                            >
                                <option value="latest">Latest</option>
                                <option value="oldest">Oldest</option>
                                <option value="1day">1 Day Ago</option>
                                <option value="1week">1 Week Ago</option>
                                <option value="1month">1 Month Ago</option>
                            </select>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5 mt-4">
                            {sortedReviews.slice(0, visibleReviews).map((review) => (
                                <div key={review.id} className="border border-[#0000001A] py-7 px-8 rounded-[20px] bg-white">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <Image src={review.ratingImage} alt="rating" width={104} height={18.49} />
                                            <div className="flex items-center gap-2 pt-[15px]">
                                                <div className="font-bold text-xl">{review.name}</div>
                                                <Image src="/assets/images/svg/greentick.svg" alt="verified" width={19.5} height={19.5} />
                                            </div>
                                        </div>
                                        <Image className="cursor-pointer" src="/assets/images/svg/option-dots.svg" alt="dots" width={20.25} height={5.25} />
                                    </div>
                                    <p className="text-[#00000099] font-normal text-base leading-[22px] pt-3 pb-6">{review.comment}</p>
                                    <p className="text-[#00000099] font-medium text-base">Posted on {review.date}</p>
                                </div>
                            ))}
                        </div>

                        {visibleReviews < sortedReviews.length && (
                            <button
                                onClick={handleLoadMore}
                                className="mt-9 border cursor-pointer border-[#0000001A] py-[13px] px-[42px] font-medium rounded-[62px] block mx-auto hover:bg-black hover:text-white transition-all duration-500"
                            >
                                Load More Reviews
                            </button>
                        )}
                    </div>
                ) : (
                    <p className='text-center font-bold text-3xl'>Coming Soon</p>
                )}
            </div>
        </div>
    );
};

export default TabComponent;