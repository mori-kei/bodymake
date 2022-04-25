import React from "react";
const TotalCarbsCalc = (foodItems) => {
  const CarbsAmounts = foodItems.map(foodItem => foodItem.carbs);
  return CarbsAmounts.reduce((acc, cur) => acc += cur, 0);
}

export default TotalCarbsCalc