'use client';

// import whatsappIcon from "./WhatsApp.svg";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const whatsappURL = `https://wa.me/?text=Hi%20LingoQiao%2C%20I%20need%20a%20quote`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-20 sm:bottom-20 right-4 sm:right-5 z-50 bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
      aria-label="Contact us on WhatsApp"
    >
      <img
        src='/WhatsApp.svg'
        alt="WhatsApp"
        className="w-5 sm:w-6 h-5 sm:h-6"
      />
    </button>   
  );
};

export default WhatsAppButton;
