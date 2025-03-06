
import React, { useState, useEffect, useRef } from "react";
import "./CementTruckAnimation.css"; // Create this CSS file
// import truck1 from "../assets/truck1.png";
export default function CementTruckAnimation() {

  const [truckX, setTruckX] = useState(0); // Initial horizontal position
  const [cementTrail, setCementTrail] = useState([]); // Array to store cement positions
  const truckRef = useRef(null); //reference to the truck element



  useEffect(() => {
    const interval = setInterval(() => {
      setTruckX((prevX) => prevX + 5); // Move the truck 5 pixels to the right
      setCementTrail((prevTrail) => [
        ...prevTrail,
        { x: truckX, y: truckRef.current.offsetTop + truckRef.current.offsetHeight / 2 },
      ]);
    }, 100); // Run every 100 milliseconds (adjust for speed)
  
    return () => clearInterval(interval); // Cleanup: clear the interval when the component unmounts
  }, [truckX]);
  return (
    <div className="container">
      <div
        ref={truckRef}
        className="truck"
        style={{ left: `${truckX}px` }}
      >
  <img src={('../assets/truck1.png')} alt="Cement Truck" style={{ width: '100%', height: '100%' }}/>
  </div>
      <div className="cement-trail">
        {cementTrail.map((cement, index) => (
          <div
            key={index}
            className="cement"
            style={{ left: `${cement.x}px`, top: `${cement.y}px` }}
          />
        ))}
      </div>
    </div>
  );
}


