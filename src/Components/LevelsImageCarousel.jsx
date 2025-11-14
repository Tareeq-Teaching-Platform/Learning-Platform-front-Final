import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ImageCarousel({title, images, scrollIndicator}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const scrollAmount = isMobile ? 100 : (100 / scrollIndicator);



  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title with decorative underline */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">{title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-300 mx-auto rounded-full"></div>
        </div>
        
        {/* Carousel Container */}
        <div className="relative bg-white rounded-2xl p-8 border border-green-100 shadow-2xl">
          
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-green-400 hover:bg-green-500 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-green-400 hover:bg-green-500 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slides Container */}
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * scrollAmount}%)` }}
            >
              {images.map((image) => (
                <div
                  key={image.id}
                  className="min-w-full md:min-w-[33.333%] px-3"
                >
                  <div className="group relative bg-gradient-to-br from-green-50 to-white rounded-xl overflow-hidden border-2 border-green-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-green-400">
                    {/* Image container with overlay effect */}
                    <Link to={`/classes/${image.id}`} className="block relative overflow-hidden">
                      <img
                        src={image.icon}
                        alt={image.name}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                    
                    {/* Title section */}
                    <div className="p-5 text-center bg-white">
                      <div className="w-12 h-1 bg-green-400 mx-auto mb-3 rounded-full"></div>
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-green-600 transition-colors">{image.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-green-400 w-10 shadow-md' 
                    : 'bg-green-200 w-2 hover:bg-green-300 hover:w-4'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}