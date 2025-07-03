'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Link } from 'nextra-theme-docs';

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
        <Link href="https://www.akzonobel.com/" target="_blank">
          <img height={40} width={160} src="/images/logos/AkzoNobel_logo.png" alt="AkzoNobel"/>
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <Link href="https://www.dovercorporation.com/" target="_blank">
          <img height={40} width={100} style={{ position: 'relative', top: '-2px', marginLeft: '25px' }} src="/images/logos/logo-dover.png" alt="Dover corp"/>
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <Link href="https://www.osu.edu/" target="_blank">
          <img height={60} width={160} style={{ position: 'relative', top: '-24px' }} src="/images/logos/osu.png" alt="Ohio State University"/>
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <Link href="https://iservice.us/" target="_blank">
          <img height={40} width={125} style={{ position: 'relative', top: '-2px' }}
               src="/images/logos/iService.png" alt="iService"/>
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <Link href="https://www.bookelevent.com/" target="_blank">
          <img height={40} width={120} style={{ position: 'relative', top: '-4px' }}
               src="/images/logos/elevent_horz_color.svg" alt="Book Elevent"/>
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <Link href="https://statushub.com/" target="_blank">
          <img height={40} width={160} style={{ position: 'relative', top: '-10px' }}  src="/images/logos/statushub.svg" alt="Status Hub"/>
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <Link href="https://www.acteamo.com/" target="_blank">
          <img height={40} width={160} src="/images/logos/acteamo.png" alt="Acteamo"/>
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <img height={40} width={130} style={{ position: 'relative', top: '-7px' }}
             src="/images/logos/overflow-logo_full.png" alt="Overflow Marketing"/>
      </SwiperSlide>

      <SwiperSlide>
        <Link href="https://hipokratija.rs/" target="_blank">
          <img height={40} width={160} style={{ position: 'relative', top: '3px' }} src="/images/logos/hipokratija.svg" alt="Hipokratija"/>
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <Link href="https://heaps.dk/" target="_blank">
          <img height={40} width={110} style={{ position: 'relative', top: '-16px' }} src="/images/logos/heaps-7-1024x576.png" alt="Heaps.dk"/>
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <img height={40} width={80} style={{ position: 'relative', top: '-13px' }} src="/images/logos/zinya.png"
             alt="Zinya Global"/>
      </SwiperSlide>
    </Swiper>
  </div>
}