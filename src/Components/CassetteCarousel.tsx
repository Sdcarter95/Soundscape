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
      rotate: 10,     // Set the rotation angle of the slides (in degrees)
      stretch: 0,     // Set the stretch space between slides (0 = no stretch)
      depth: 50,     // Set the depth of the coverflow effect (higher value = more depth)
      modifier: 1,    // Set a scale factor to modify the coverflow effect
      slideShadows: false,  // Enable slide shadows
    },

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