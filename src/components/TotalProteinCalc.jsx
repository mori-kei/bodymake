import React from "react";
const TotalProteinCalc = (foodItems) => {
  const ProteinAmounts = foodItems.map(foodItem => foodItem.protein);
  return ProteinAmounts.reduce((acc, cur) => acc += cur, 0);
}

export default TotalProteinCalc