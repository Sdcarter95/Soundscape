import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import { Cassette } from '../App';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import './css/CassetteCarousel.css';



interface CarouselProps {
  cassettes: Cassette[];
  onSlideClick: (cassette: Cassette) => void;
}

const CassetteCarousel: React.FC<CarouselProps> = ({ cassettes, onSlideClick }) => {
  const swiperParams = {
    spaceBetween: 5,
    slidesPerView: 3,
    centeredSlides: true,
    loop: false,
    slideToClickedSlide: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      enabled: true,
    },
    coverflowEffect: {
      rotate: 10,   
      stretch: 0,   
      depth: 50,   
      modifier: 1,    
      slideShadows: false,  
    },
    initialSlide: 3,
    modules: [Navigation, EffectCoverflow],
    effect: 'coverflow'
  };




  return (
    <div className="swiper-container">
      <Swiper {...swiperParams}>
        {cassettes.map((cassette, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content" onClick={() => onSlideClick(cassette)}>
              <img src={`https://img.youtube.com/vi/${cassette.video_id}/maxresdefault.jpg`} alt={cassette.name} />
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev"></div> 
        <div className="swiper-button-next"></div> 
        
      </Swiper>

    </div>

  );
};

export default CassetteCarousel;