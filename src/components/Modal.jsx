import IonIcon from "@reacticons/ionicons";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const Modal = ({ id, trigger, children, className }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isModalOpen = new URLSearchParams(location.search).get(id) === "open";

    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isModalOpen) {
            setIsAnimating(true);
        } else {
            setTimeout(() => setIsAnimating(false), 300);
        }
    }, [isModalOpen]);

    const openModal = () => {
        navigate(`${location.pathname}?${id}=open`);
    };

    const closeModal = () => {
        setIsAnimating(true);
        navigate(location.pathname);
    };

    return (
        <>
            <div onClick={openModal} className={className}>{trigger}</div>

            {/* Modal */}
            {isModalOpen &&
                isAnimating && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
                        onClick={closeModal}
                    >
                        <div
                            className={`bg-white rounded-lg shadow-lg w-96 p-6 transform transition-transform duration-300 ${isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                                }`}
                            onClick={(e) => e.stopPropagation()} // Prevent close on click inside modal
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                            >
                                <IonIcon name="close-circle" size="8" />
                            </button>
                            {children}
                        </div>
                    </div>
                )}
        </>
    );
};

export default Modal;
