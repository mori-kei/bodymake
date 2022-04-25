import { List } from "@material-ui/core";
import React from "react";
import { db } from "../firebase";
import FoodItem from "./FoodItem";
import styled from "styled-components";
import dayjs from "dayjs";

const ListComponent = styled.div`
@media (min-width:768px) {
  margin-top:50px;
  width:1280px;
  margin: 0 auto;
  & div {
    & h3{
      text-align: center;
      
    }
    & ul {
      display:flex;
      justify-content: space-between;
      flex-wrap:wrap
    }
  }
}
@media (max-width:768px){
  width:80%;
  margin:0 auto;
  margin-top:80px;
  & div {
    & h3{
      text-align: center;
      
    }
    & ul {
      padding:0;
      width: 80%;
      margin:0 auto;
    }
  }
}
`
const ItemList = ({deleteFood,foodItems,selectedMonth,thisMonth,calorieTotal}) => {
  
  return(
    <ListComponent>
      <div className="">
          
          <ul>
            {foodItems.map((foodItem) => (
              
              <FoodItem 
                deleteFood={deleteFood}
                foodText={foodItem.text}
                foodCalorie={foodItem.calorie}
                foodProtein={foodItem.protein}
                foodFat={foodItem.fat}
                foodCarbs={foodItem.carbs}
                foodWeight={foodItem.weight}
               
                foodItem={foodItem}
                key={foodItem.docId}
                selectedMonth={selectedMonth}
                thisMonth= {thisMonth}
                calorieTotal = {calorieTotal}
              />
            ))}
          </ul>
      </div>
  </ListComponent>
  )
}

export default ItemList;