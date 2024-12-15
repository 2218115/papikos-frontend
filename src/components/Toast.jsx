import { useState, useEffect } from "react";

const Toast = ({ message, type = "error", duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration - 500); // Start fading out slightly before the duration ends

        const closeTimer = setTimeout(() => {
            if (onClose) onClose();
        }, duration);

        return () => {
            clearTimeout(timer);
            clearTimeout(closeTimer);
        };
    }, [duration, onClose]);

    return (
        <div
            className={`fixed top-5 right-5 p-4 rounded-lg shadow-md text-white transition-all duration-500 ease-in-out transform ${isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-2"
                } ${type === "error" ? "bg-red-500" : "bg-green-500"
                }`}
        >
            {message}
        </div>
    );
};

export default Toast;
