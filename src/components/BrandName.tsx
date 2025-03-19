import React from 'react'
import Image from 'next/image'

const BrandName = () => {
  return (
      <div className='bg-black'>
          <div className="container px-4 mx-auto">
              <div className="flex flex-wrap xl:gap-[106px] lg:gap-16 gap-[25px] justify-center py-11">
                  <Image src="/assets/images/png/versace.png" alt="Brand Logo" width={166} height={33} className='xl:w-[166px] xl:h-[33px] w-[116px] h-[23px]' />
                  <Image src="/assets/images/png/zara.png" alt="Brand Logo" width={91} height={38} className='xl:w-[91px] xl:h-[38px] w-[63px] h-[26px]'/>
                  <Image src="/assets/images/png/gucci.png" alt="Brand Logo" width={156} height={36} className='xl:w-[156px] xl:h-[36px] w-[109px] h-[25px]' />
                  <Image src="/assets/images/png/prada.png" alt="Brand Logo" width={194} height={32} className='xl:w-[194px] xl:h-[32px] w-[127px] h-[21px] ' />
                  <Image src="/assets/images/png/calvin.png" alt="Brand Logo" width={206} height={33} className='xl:w-[205px] xl:h-[33px] w-[134px] h-[21px] ' />
              </div>
          </div>
      
    </div>
  )
}

export default BrandName
