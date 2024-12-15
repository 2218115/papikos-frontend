import React, { useEffect, useState } from "react";
import { BASE_URL } from "../lib/config";
import IonIcon from "@reacticons/ionicons";

const ImageCarousel = ({ fotos }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(null); // For animation direction

    const images = fotos?.length > 0
        ? fotos.map(kf => `${BASE_URL}/foto_kos/${kf.path}`)
        : ["https://via.placeholder.com/800x400"];

    useEffect(() => {
        setInterval(() => {
            handleNext();
        }, 2000)
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
        if (direction === "left") return;
        setDirection("left");
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        if (direction === "right") return; // Prevent duplicate animation
        setDirection("right");
    };

    return (
        <div className="mb-6 relative">
            {/* Carousel Container */}
            <div className="relative w-full h-72 sm:h-80 md:h-96 bg-gray-300 rounded-lg overflow-hidden">
                {images.map((img, index) => (
                    <div
                        key={img}
                        className={`absolute w-full h-full object-cover transition-transform duration-500 ease-in-out ${index === currentIndex ? "translate-x-0" : index < currentIndex ? "-translate-x-full" : "translate-x-full"
                            }`}
                    >
                        <img
                            src={img}
                            alt={`Kos Image ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Left Button */}
            <button
                onClick={handlePrev}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
            >
                <IonIcon name="chevron-back-outline" />
            </button>

            {/* Right Button */}
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
            >
                <IonIcon name="chevron-forward-outline" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setCurrentIndex(index)} // Click to jump to specific image
                        className={`cursor-pointer w-3 h-3 rounded-full ${index === currentIndex ? "bg-gray-800" : "bg-gray-400"}`}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
