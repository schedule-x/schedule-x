'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

export default function LogoSlide() {
  return (
    <div className="marquee-wrapper">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        slidesPerView={6}
        spaceBetween={'90px'}
        speed={8000}
        allowTouchMove={false}
        autoplay={{
          delay: 1,
        }}
        style={{ alignItems: 'center' }}
      >
        <SwiperSlide>
          <img
            height={40}
            width={160}
            style={{ width: '160px', height: '40px' }}
            src="/images/logos/AkzoNobel_logo.png"
            alt="AkzoNobel"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            height={40}
            width={160}
            style={{
              width: '160px',
              height: '40px',
              transform: 'scale(1.35)',
            }}
            src="/images/logos/eu-commission.png"
            alt="European Commission"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            height={40}
            width={150}
            style={{ width: '150px', height: '40px' }}
            src="/images/logos/octave.png"
            alt="Octave"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            height={40}
            width={100}
            style={{
              width: '100px',
              height: '40px',
              transform: 'scale(1.12)',
            }}
            src="/images/logos/logo-dover.png"
            alt="Dover corp"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            height={40}
            width={120}
            style={{
              width: '120px',
              height: '40px',
              transform: 'scale(1.12)',
            }}
            src="/images/logos/ballys.png"
            alt="Bally's"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            height={60}
            width={160}
            style={{
              width: '160px',
              height: '60px',
              transform: 'scale(1.45)',
            }}
            src="/images/logos/osu.png"
            alt="Ohio State University"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            height={40}
            width={160}
            style={{ width: '160px', height: '40px' }}
            src="/images/logos/keenfinity.png"
            alt="Keenfinity"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            height={40}
            width={125}
            style={{ width: '125px', height: '40px' }}
            src="/images/logos/iService.png"
            alt="iService"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            height={40}
            width={160}
            style={{ width: '160px', height: '40px' }}
            src="/images/logos/statushub.svg"
            alt="Status Hub"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
