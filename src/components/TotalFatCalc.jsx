import React from "react";

const TotalFatCalc = (foodItems) => {
  const FatAmounts = foodItems.map(foodItem => foodItem.fat);
  return FatAmounts.reduce((acc, cur) => acc += cur, 0);
}

export default TotalFatCalc