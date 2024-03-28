import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import { Cassette } from '../App';
import { mixedTape } from './RecorderConsole';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import './css/CassetteCarousel.css';



interface CarouselProps {
  cassettes: Cassette[];
  mixedTapes:  mixedTape[];
  onSlideClick: (cassette: Cassette) => void;
  onMixTapeClick: (mixTapeSelection: mixedTape) => void;
}

enum imagePaths {
  label = "https://i.imgur.com/ZjrB4t1.png",
}

const CassetteCarousel: React.FC<CarouselProps> = ({ cassettes, mixedTapes, onSlideClick, onMixTapeClick }) => {
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
        {mixedTapes.map((userTape, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content-tape" onClick={() => onMixTapeClick(userTape)}>
            <p className='slide-content-tape-text'>{userTape.name}</p>
              <img src={imagePaths.label} alt={userTape.name} />
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