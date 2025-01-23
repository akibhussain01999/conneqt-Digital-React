import React, { useState } from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";
import CityGrouper from './CityGrouper';

const Temperature = () => {
  const [temperature, setTemperature] = useState(10);

  const handleIncrease = () => {
    setTemperature((prevTemp) => prevTemp + 1);
  };

  const handleDecrease = () => {
    setTemperature((prevTemp) => prevTemp - 1); // Allow going below 0
  };

  const getCardStyle = () => {
    if (temperature < 0) {
      return { backgroundColor: "#d3d3d3" }; // Gray color for negative temperatures
    } else if (temperature === 0) {
      return { backgroundColor: "#ffffcc" }; // Yellowish color for 0°C
    } else if (temperature >= 15) {
      return { backgroundColor: "#ffcccb" }; // Light red for >= 15°C
    } else {
      return { backgroundColor: "#add8e6" }; // Light blue for < 15°C
    }
  };

  return (
    <>
    <Card
      style={{
        ...getCardStyle(),
        padding: "20px",
        textAlign: "center",
        borderRadius: "8px",
        transition: "background-color 0.3s ease",
      }}
      elevation={3}
    >
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Temperature: {temperature}°C
        </Typography>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Button variant="contained" color="primary" onClick={handleDecrease}>
            -
          </Button>
          <Button variant="contained" color="primary" onClick={handleIncrease}>
            +
          </Button>
        </div>
      </CardContent>
      
    </Card>
    <div>

    <CityGrouper />
    </div>
</>
  
  );
};

export default Temperature;



// const str = ["Pune", "Ahmedabad", "Rajkot", "Mumbai", "Delhi", "Kanpur"];

// // Function to group cities into the desired format
// function groupCities(cities) {
//   return [
//     [cities[cities.length - 1]], // Last city: Kanpur
//     cities.slice(-3, -1).reverse(), // Reverse the second and third last cities
//     cities.slice(0, -3).reverse() // Remaining cities in reverse order
//   ];
// }

// const output = groupCities(str);
// console.log(output);



// const arr = [1, 2, 4, 5, 6, 7, 9];

// // Find even numbers
// const evenNumbers = arr.filter(num => num % 2 === 0);

// // Find odd numbers
// const oddNumbers = arr.filter(num => num % 2 !== 0);

// console.log("Even Numbers:", evenNumbers); // Output: [2, 4, 6]
// console.log("Odd Numbers:", oddNumbers);   // Output: [1, 5, 7, 9]

