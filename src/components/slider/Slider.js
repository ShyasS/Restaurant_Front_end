import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
  import 'swiper/css';
  import 'swiper/css/effect-cube';
  import 'swiper/css/pagination';
  import '../Slider/styles.css'
  import { Autoplay, Pagination, Navigation } from 'swiper/modules';
  import { EffectCube } from 'swiper/modules';
const Slider = () => {
  return (
    <div>
   
   <Swiper
        effect={'cube'}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Autoplay,EffectCube]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={require('../../assets/img/ESliderImg1.jpg')}/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={require('../../assets/img/ESliderImg2.jpg')} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={require('../../assets/img/ESliderImg3.jpg')}/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={require('../../assets/img/ESliderImg1.jpg')}/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={require('../../assets/img/ESliderImg2.jpg')} />
        </SwiperSlide>
        <SwiperSlide>
          <img ssrc={require('../../assets/img/ESliderImg3.jpg')}/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={require('../../assets/img/ESliderImg1.jpg')} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={require('../../assets/img/ESliderImg2.jpg')} />
        </SwiperSlide>
        <SwiperSlide>
        <img src={require('../../assets/img/ESliderImg3.jpg')} />
        </SwiperSlide>
      </Swiper>


    </div>
  )
}

export default Slider