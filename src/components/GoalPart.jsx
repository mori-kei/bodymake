import React from "react";

const GoalPart = ({goalItems}) => {
  if (goalItems !== undefined){
    return(
      <div className="">
        <div className="">
        <p>目標体重</p>
         <p>{goalItems.goalBodyWeight}kg</p>
        </div>
        <div className="">
        <p>目標摂取カロリー</p>
         <p>{Math.round(goalItems.goalBmr) }kcal</p>
        </div>
        <div className="">
        <p>目標摂取タンパク質量</p>
         <p>{Math.round(goalItems.goalProtein) }g</p>
        </div>
        <div className="">
        <p>目標摂取脂質量</p>
         <p>{Math.round(goalItems.goalFat) }g</p>
        </div>
        <div className="">
        <p>目標摂取炭水化物量</p>
         <p>{Math.round(goalItems.goalCarbs) }g</p>
        </div>
      </div>
     )
  }else {
    return null;
  }
 
}

export default GoalPart;