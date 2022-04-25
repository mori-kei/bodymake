import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../auth/AuthProvider";

import { db } from "../firebase";
import firebase from "firebase/app";
import Header from "./Header";
import AddItem from "./AddItem";
import ItemList from "./ItemList";
import TotalCalorieCalc from "./TotalCalorieCalc";
import CalorieState from "./CalorieState";
import ProteinState from "./ProteinState";
import TotalProteinCalc from "./TotalProteinCalc";
import TotalFatCalc from "./TotalFatCalc";
import FatState from "./FatState";
import TotalCarbsCalc from "./TotalCarbsCalc";
import CarbsState from "./CarbsState";
import PercentState from "./PercentState";
import styled from "styled-components";
import Goal from "./Goal";
import Dates from "./Dates";
const DivTotal = styled.div`
  @media (min-width: 768px) {
    display: flex;
    max-width: 1280px;
    margin: 0 auto;
    justify-content: space-between;
  }
  @media (max-width: 768px) {
  }
`;
const Home = () => {
  // 必要なState
  const [foodItems, setFoodItems] = useState([]);
  const [inputText, setInputText] = useState("");
  const [inputCalorie, setInputCalorie] = useState("");
  const [inputProtein, setInputProtein] = useState("");
  const [inputFat, setInputFat] = useState("");
  const [inputCarbs, setInputCarbs] = useState("");
  const [date, setDate] = useState(new Date());
  const [inputWeight, setInputWeight] = useState("");
  const [goalItems, setGoalItems] = useState([]);
  const [goalShow, setGoalShow] = useState(false);
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [monthOrDate,setMonthOrDate] = useState(true);
  

  useEffect(() => {
    getDateFoodData();
  }, []);

  useEffect(() => {
      getDateFoodData();
  },[date])
  console.log(foodItems)
  console.log(goalItems)
  const startofDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(),0, 0, 0, 0);
  };

  //日の終わり
  const endofDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
    23, 59, 59, 999);
  };
  
  const setPrevDate = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate() - 1;
    setDate(new Date(year, month, day));
  };
  const setNextDate = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate() + 1;
    setDate(new Date(year, month, day));
  };


  
  const selectedMonth = date.getMonth() + 1;
  const today = new Date();
  const thisMonth = today.getMonth() + 1;

  const getDateFoodData = () => {
    const foodData = db.collection("foodItems");
    foodData
      .where("uid", "==", currentUser.uid)
      .orderBy("date")
      .startAt(startofDate(date))
      .endAt(endofDate(date))
      .onSnapshot((query) => {
        const foodItems = [];
        query.forEach((doc) =>
          foodItems.push({ ...doc.data(), docId: doc.id })
        );
        setFoodItems(foodItems);
      });
  };
  // データ追加
  const addFoodItem = (text, calorie, protein, fat, carbs, weight) => {
    const docId = Math.random().toString(32).substring(2);
    const date = firebase.firestore.Timestamp.now();
    db.collection("foodItems")
      .doc(docId)
      .set({
        uid: currentUser.uid,
        text,
        calorie,
        protein,
        fat,
        carbs,
        weight,
        date,
      })
      .then((response) => {
        setFoodItems([
          ...foodItems,
          {
            text: inputText,
            calorie: inputCalorie,
            protein: inputProtein,
            fat: inputFat,
            carbs: inputCarbs,
            weight: inputWeight,
            docId: docId,
            date: date,
          },
        ]);
      });
  };

  // データ削除
  const deleteFood = (docId) => {
    db.collection("foodItems").doc(docId).delete();
  };

  // 目標データ取得
  useEffect(() => {
    getGoalData();
  }, []);

  const getGoalData = () => {
    db.collection("goalItems")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setGoalItems(doc.data());
      });
  };

  const calorieTotal = TotalCalorieCalc(foodItems);
  const proteinTotal = TotalProteinCalc(foodItems);
  const fatTotal = TotalFatCalc(foodItems);
  const carbsTotal = TotalCarbsCalc(foodItems);
  const openGoal = () => {
    setGoalShow(true);
  };
  const closeGoal = () => {
    setGoalShow(false);
  };
  if (goalShow) {
    return (
      <>
        <Header
          date={date}
         
          goalItems={goalItems}
          openGoal={openGoal}
          closeGoal={closeGoal}
        />
        <Goal closeGoal={closeGoal} getGoalData={getGoalData}/>
      </>
    );
  } else {
    return (
      <>
        <Header date={date} goalItems={goalItems} openGoal={openGoal}  getGoalData={getGoalData}/>
        <Dates
          date={date}
          setPrevDate={setPrevDate}
          setNextDate={setNextDate}
        />
       

        <div>
          <DivTotal>
            <CalorieState calorieTotal={calorieTotal} />
            <ProteinState proteinTotal={proteinTotal} />
            <FatState fatTotal={fatTotal} />
            <CarbsState carbstotal={carbsTotal} />
          </DivTotal>
          <PercentState
            proteinTotal={proteinTotal}
            fatTotal={fatTotal}
            carbsTotal={carbsTotal}
          />
          <AddItem
            addFoodItem={addFoodItem}
            inputText={inputText}
            setInputText={setInputText}
            inputCalorie={inputCalorie}
            setInputCalorie={setInputCalorie}
            inputProtein={inputProtein}
            setInputProtein={setInputProtein}
            inputFat={inputFat}
            setInputFat={setInputFat}
            inputCarbs={inputCarbs}
            setInputWeight={setInputWeight}
            inputWeight={inputWeight}
            setInputCarbs={setInputCarbs}
            selectedMonth={selectedMonth}
            thisMonth={thisMonth}
          />
          <ItemList
            deleteFood={deleteFood}
            foodItems={foodItems}
            selectedMonth={selectedMonth}
            thisMonth={thisMonth}
            calorieTotal={calorieTotal}
          />
        </div>
      </>
    );
  }
};

export default Home;
