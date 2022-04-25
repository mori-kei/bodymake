import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { db } from "../firebase";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles,createStyles } from '@material-ui/core/styles';


const DIV_Goal = styled.div`
  @media (min-width: 768px) {
    max-width: 1280px;
    width: 80%;
    margin: 0 auto;
    & h1 {
      text-align: center;
    }
  }
  @media (max-width: 768px) {
    max-width: 85%;
    margin: 0 auto;
    & h1 {
      text-align: center;
    }
  }
`;
const DIV_Form = styled.div`
  @media (min-width: 768px) {
    width: 100%;
    & div {
      display: flex;
      width: 98%;
      margin: 0 auto;
      & div {
        margin-top: 10px;
      }
    }
    & button {
      display: block;
      width: 300px;
      margin: 0 auto;
      margin-top: 25px;
    }
  }
  @media (max-width: 768px) {
    width: 98%;
    margin: 0 auto;

    & div {
      & div {
        margin-top: 10px;
        & div {
          width: 100%;
        }
      }
    }
    & button {
      display: block;
      width: 100%;
      margin: 0 auto;
      margin-top: 25px;
    }
  }
`;
const DIV_Result = styled.div`
  @media (min-width: 768px) {
    margin-top: 50px;
    & div {
      width: 95%;
      margin: 0 auto;
      & div {
        margin-top: 10px;
      }
    }
    & button {
      display: block;
      width: 300px;
      margin: 0 auto;
      margin-top: 25px;
    }
  }
  @media (max-width: 768px) {
    width: 98%;

    margin: 0 auto;
    & div {
      margin-top: 50px;
    }
    & button {
      display: block;
      width: 100%;
      margin: 0 auto;
      margin-top: 25px;
    }
  }
`;
const StyledTextFields = styled(TextField)`
  @media (min-width: 768px) {
    margin-top: 20px;
  }
`;
const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      color: "#333",
      backgroundColor: "#81c784",
      "&:hover": {
        background: "#2A6041"
      },
    },
  })
);
const Goal = ({ closeGoal,getGoalData }) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles()
  const [inputBmr, setInputBmr] = useState(0);
  const [bmr, setBmr] = useState(0);
  const [selectedValue, setSelectedValue] = useState(1);
  const [goalBmr, setGoalBmr] = useState(0);
  const [goalProtein, setGoalProtein] = useState(0);
  const [goalFat, setGoalFat] = useState(0);
  const [goalCarbs, setGoalCarbs] = useState(0);
  const [goalBodyWeight, setGoalBodyWeight] = useState(0);
  const [proteinItem, setProteinItem] = useState(0);
  const [calcItem, setCalcItem] = useState(0);
  const [fatItem, setFatItem] = useState(0);
  const [targetWeight, setTargetWeight] = useState(1);
  const [targetBmr, setTargetBmr] = useState(0);
  const [bodyweight, setBodyWeight] = useState(0);
  const [goalItems, setGoalItems] = useState([]);
  const [change, setChange] = useState(false);
  const MomentumLevel = [
    {
      value: "1",
      label: "レベル1（特に運動をしていない人）",
    },
    {
      value: "1.3725",
      label: "レベル2（週1～2回運動をする人)",
    },
    {
      value: "1.55",
      label: "レベル3(週に3回程度運動をする人)",
    },
    {
      value: "1.725",
      label: "レベル4(週に4回～5回運動をする人)",
    },
    {
      value: "1.9",
      label: "レベル5(ほぼ毎日運動をする人)",
    },
  ];
  const WeightLevel = [
    {
      value: "1",
      label: "1Kg",
    },
    {
      value: "2",
      label: "2Kg",
    },
    {
      value: "3",
      label: "3Kg",
    },
    {
      value: "4",
      label: "4Kg",
    },
    {
      value: "5",
      label: "5Kg",
    },
  ];
  useEffect(() => {
    //摂取タンパク質量は体重×2.5g
    setGoalProtein(bodyweight * 2);
    //摂取脂質量は目標摂取カロリー×0.25/9
    setGoalFat((goalBmr * 0.25) / 9);
  }, [bodyweight, goalBmr]);

  useEffect(() => {
    setProteinItem(goalProtein * 4);
  }, [goalProtein]);

  useEffect(() => {
    setFatItem(goalFat * 9);
  }, [goalFat]);

  useEffect(() => {
    setCalcItem(goalBmr - goalProtein * 4 - goalFat * 9);
  }, [goalBmr, goalProtein, goalFat]);

  useEffect(() => {
    setGoalCarbs(calcItem / 4);
  }, [calcItem]);

  useEffect(() => {
    setGoalBmr(bmr - targetBmr);
  }, [bmr, targetBmr]);

  const goalsCalc = () => {
    // ユーザー入力系の確定値を先に計算してセット
    setBmr(inputBmr * selectedValue);
    setGoalBodyWeight(bodyweight - targetWeight);
    setTargetBmr(240 * targetWeight);
  };

  // データ追加
  const addGoalItem = async () => {
    const docId = currentUser.uid;
    const itemsRef = db.collection("goalItems").doc(docId);
    const doc = await itemsRef.get();
    if (doc.exists) {
      itemsRef.update({
        uid: currentUser.uid,
        goalBmr,
        goalProtein,
        goalFat,
        goalCarbs,
        goalBodyWeight,
      });
      setChange(!change);
      closeGoal();
    } else {
      itemsRef.set({
        uid: currentUser.uid,
        goalBmr,
        goalProtein,
        goalFat,
        goalBodyWeight,
        goalCarbs,
        docId: docId,
      });
      setChange(!change);
      closeGoal();
    }
  };



  return (
    <>
      <DIV_Goal>
        <h1>目標設定</h1>
        <div className="">
          <DIV_Form>
            <div className="">
              <div className="">
                <StyledTextFields
                  label="BMR(kcal)を入力してください"
                  onChange={(e) => setInputBmr(e.target.value)}
                  value={inputBmr}
                  type="number"
                  variant="outlined"
                />
              </div>
              <div className="">
                <StyledTextFields
                  label="現在の体重(kg)を入力してください"
                  onChange={(e) => setBodyWeight(e.target.value)}
                  value={bodyweight}
                  type="number"
                  variant="outlined"
                />
              </div>
            </div>
            <div className="">
              <div className="">
                <StyledTextFields
                  id="outlined-select-currency"
                  select
                  onChange={(e) => setSelectedValue(e.target.value)}
                  variant="outlined"
                  helperText="運動量レベルを選択してください"
                  value={selectedValue}
                >
                  {MomentumLevel.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </StyledTextFields>
              </div>
              <div className="">
                <StyledTextFields
                  id="outlined-select-currency"
                  select
                  onChange={(e) => setTargetWeight(e.target.value)}
                  helperText="一カ月後までに痩せたい体重を選択してください"
                  variant="outlined"
                  value={targetWeight}
                >
                  {WeightLevel.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </StyledTextFields>
              </div>
            </div>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => goalsCalc()}
            >
              ① 計算する！
            </Button>
          </DIV_Form>

          <DIV_Result>
            <div className="">
              <h3>あなたの基礎代謝</h3>
              <p>{Math.round(bmr)}kcal</p>
            </div>
            <div className="">
              <h3>一日当たりの目標摂取カロリー</h3>
              <p>{Math.round(goalBmr)}kcal</p>
            </div>
            <div className="">
              <h3>あなたの目標タンパク質量</h3>
              <p> {Math.round(goalProtein)}g</p>
            </div>
            <div className="">
              <h3>あなたの目標脂質量</h3>
              <p> {Math.round(goalFat)}g</p>
            </div>
            <div className="">
              <h3>あなたの目標炭水化物量</h3>
              <p>{Math.round(goalCarbs)}g</p>
            </div>

            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => addGoalItem()}
            >
              ② 目標に設定する！
            </Button>
          </DIV_Result>

        </div>
      </DIV_Goal>
    </>
  );
};

export default Goal;
