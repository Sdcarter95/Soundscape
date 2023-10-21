import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Cassette } from '../App';

interface CarouselProps {
    cassettes: Cassette[];
  }
  
  const CassetteCarousel: React.FC<CarouselProps> = ({ cassettes }) => {
    return (
      <Carousel>
        {cassettes.map((cassette, index) => (
          <div key={index}>
            <img
              src={`https://img.youtube.com/vi/${cassette.video_id}/maxresdefault.jpg`}
              alt={cassette.name}
              onClick={() => alert(`Selected source: ${cassette.source}`)}
            />
          </div>
        ))}
      </Carousel>
    );
  };
  
  export default CassetteCarousel;