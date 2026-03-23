import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisisble, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    }
    else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        type="button"
        className={`bg-purple-600 hover:bg-purple-700 text-white p-2.5 rounded-full
        shadow-lg transition-all duration-300 focus:outline-none cursor-pointer
        ${isVisisble ? "opacity-100 translate-y-0" : "opacity-0 translate-10 pointer-events-none"}`}
        onClick={scrollToTop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollToTop;
