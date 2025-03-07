import React, { useState, useEffect } from "react";
import "./CementTruckAnimation.css";
import truck2 from '../assets/truck2.png';

export default function CementTruckAnimation() {
  const [truckX, setTruckX] = useState(window.innerWidth); // Start on the right edge

  useEffect(() => {
    const interval = setInterval(() => {
      setTruckX((prevX) => {
        if (prevX < -200) { // Check if it's off-screen to the left
          return window.innerWidth; // Reset to the right edge
        }
        return prevX - 3; // Move left
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="truck-container">
      <img
        src={truck2}
        alt="Moving Truck"
        className="moving-truck"
        style={{ left: `${truckX}px` }}
      />
    </div>
  );
}