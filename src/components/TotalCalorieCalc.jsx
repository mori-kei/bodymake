import React from "react";
const TotalCalorieCalc = (foodItems) => {
  const CalorieAmounts = foodItems.map(foodItem => foodItem.calorie);
  return CalorieAmounts.reduce((acc, cur) => acc += cur, 0);
}

export default TotalCalorieCalc