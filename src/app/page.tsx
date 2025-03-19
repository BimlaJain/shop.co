import BrandName from '@/components/BrandName'
import DressStyle from '@/components/BrowseByDressStyle'
import Header from '@/components/common/Header'
import Footer from '@/components/Footer'
import HappyCustomer from '@/components/HappyCustomer'
import HeroSection from '@/components/Hero'
import LatestOffer from '@/components/LatestOffer'
import NewArrivals from '@/components/NewArrivals'
import TopSelling from '@/components/TopSelling'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <BrandName />
      <NewArrivals />
      <TopSelling />
      <DressStyle />
      <HappyCustomer />
      <LatestOffer/>
    </div>
  )
}

export default page
