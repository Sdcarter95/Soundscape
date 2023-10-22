import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Cassette } from '../App';
import 'swiper/css';
import './css/CassetteCarousel.css'


interface CarouselProps {
  cassettes: Cassette[];
  onSlideClick: (cassette: Cassette) => void;
}

const CassetteCarousel: React.FC<CarouselProps> = ({ cassettes, onSlideClick }) => {
  const swiperParams = {
    spaceBetween: 20,
    slidesPerView: 4,
    centeredSlides: true,
    loop: false,
    slideToClickedSlide: true,
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