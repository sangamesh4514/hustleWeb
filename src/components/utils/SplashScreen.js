import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userType = localStorage.getItem("usertype");
    if (userId) {
      navigate("/home");
    } else {
      navigate("/login");
    }
    return () => {};
  }, []);

  return (
    <div>
      <a href="https://www.animatedimages.org/cat-walking-1635.htm">
        <img
          src="https://www.animatedimages.org/data/media/1635/animated-walking-image-0004.gif"
          border="0"
          alt="animated-walking-image-0004"
        />
      </a>
      f
    </div>
  );
};

export default SplashScreen;
