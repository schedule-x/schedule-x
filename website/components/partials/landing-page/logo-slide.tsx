'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

export default function LogoSlide() {
    return <div className="marquee-wrapper">
    <Swiper
      modules={[Autoplay]}
      loop={true}
      slidesPerView={6}
      spaceBetween={'90px'}
      speed={8000}
      allowTouchMove={false}
      autoplay={{
        delay: 1
      }}
      style={{ alignItems: 'center' }}
    >
      <SwiperSlide>
        <img height={40} width={160} src="/images/logos/AkzoNobel_logo.png" alt="AkzoNobel"/>
      </SwiperSlide>

      <SwiperSlide>
          <img height={40} width={100} style={{ position: 'relative', top: '-2px', marginLeft: '25px' }} src="/images/logos/logo-dover.png" alt="Dover corp"/>
      </SwiperSlide>

      <SwiperSlide>
        <img height={60} width={160} style={{ position: 'relative', top: '-24px' }} src="/images/logos/osu.png" alt="Ohio State University"/>
      </SwiperSlide>

      <SwiperSlide>
        <img height={40} width={125} style={{ position: 'relative', top: '-2px' }}
               src="/images/logos/iService.png" alt="iService"/>
      </SwiperSlide>

      <SwiperSlide>
        <img height={40} width={120} style={{ position: 'relative', top: '-4px' }}
               src="/images/logos/elevent_horz_color.svg" alt="Book Elevent"/>
      </SwiperSlide>

      <SwiperSlide>
        <img height={40} width={160} style={{ position: 'relative', top: '-10px' }}  src="/images/logos/statushub.svg" alt="Status Hub"/>
      </SwiperSlide>

      <SwiperSlide>
        <img height={40} width={160} src="/images/logos/acteamo.png" alt="Acteamo"/>  
      </SwiperSlide>

      <SwiperSlide>
        <img height={40} width={130} style={{ position: 'relative', top: '-7px' }}
             src="/images/logos/overflow-logo_full.png" alt="Overflow Marketing"/>
      </SwiperSlide>

      <SwiperSlide>
        <img height={40} width={160} style={{ position: 'relative', top: '3px' }} src="/images/logos/hipokratija.svg" alt="Hipokratija"/>  
      </SwiperSlide>

      <SwiperSlide>
        <img height={40} width={110} style={{ position: 'relative', top: '-16px' }} src="/images/logos/heaps-7-1024x576.png" alt="Heaps.dk"/>  
      </SwiperSlide>

      <SwiperSlide>
        <img height={40} width={80} style={{ position: 'relative', top: '-13px' }} src="/images/logos/zinya.png"
             alt="Zinya Global"/>
      </SwiperSlide>
    </Swiper>
  </div>
}