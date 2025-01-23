import React from "react";

const CityGrouper = ({ cities = ["Pune", "Ahmedabad", "Rajkot", "Mumbai", "Delhi", "Kanpur"] }) => {
  // Safeguard for when cities is undefined or null
  const groupCities = (cities) => {
    if (!cities || cities.length < 3) {
      // Return the cities grouped as they are if fewer than 3 cities
      return [cities];
    }

    // Grouping logic for 3 or more cities
    return [
      [cities[cities.length - 1]], // Last city
      cities.slice(-3, -1).reverse(), // Reverse the second and third last cities
      cities.slice(0, -3).reverse(), // Remaining cities in reverse order
    ];
  };

  const groupedCities = groupCities(cities);

  return (
    <div>
      <h2>Grouped Cities</h2>
      <ul>
        {groupedCities.map((group, index) => (
          <li key={index}>
            Group {index + 1}: {group.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityGrouper;
