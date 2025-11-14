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

  // Demo data
  const demoImages = images || [
    {id: 1, title: "Class 1", url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400"},
    {id: 2, title: "Class 2", url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400"},
    {id: 3, title: "Class 3", url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400"},
    {id: 4, title: "Class 4", url: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=400"},
    {id: 5, title: "Class 5", url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400"}
  ];

  const displayImages = images || demoImages;

  return (
    <div className="py-12 px-4 ">
      <div className="max-w-7xl mx-auto">
        {/* Title with decorative underline */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">{title || "Featured Items"}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-300 mx-auto rounded-full"></div>
        </div>
        
        {/* Carousel Container with enhanced shadow and border */}
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
          
          {/* Previous Button - Enhanced styling */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-green-400 hover:bg-green-500 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button - Enhanced styling */}
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
              {displayImages.map((image, index) => (
                <Link to={`teacher/${image.id}`}
                  key={image.id}
                  className="min-w-full md:min-w-[33.333%] px-3"
                >
                  <div className="group relative bg-gradient-to-br from-green-50 to-white rounded-xl overflow-hidden border-2 border-green-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-green-400">
                    {/* Image container with overlay effect */}
                    <div className="relative overflow-hidden">
                      <img
                        src={image.url || 'https://cdn-icons-png.flaticon.com/512/12034/12034905.png'}
                        alt={image.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Title section with green accent */}
                    <div className="p-5 text-center bg-white">
                      <div className="w-12 h-1 bg-green-400 mx-auto mb-3 rounded-full"></div>
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-green-600 transition-colors">{image.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Enhanced Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {displayImages.map((_, index) => (
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