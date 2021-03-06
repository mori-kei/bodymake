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
      label: "?????????1???????????????????????????????????????",
    },
    {
      value: "1.3725",
      label: "?????????2??????1???2?????????????????????)",
    },
    {
      value: "1.55",
      label: "?????????3(??????3???????????????????????????)",
    },
    {
      value: "1.725",
      label: "?????????4(??????4??????5?????????????????????)",
    },
    {
      value: "1.9",
      label: "?????????5(??????????????????????????????)",
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
    //???????????????????????????????????2.5g
    setGoalProtein(bodyweight * 2);
    //????????????????????????????????????????????0.25/9
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
    // ???????????????????????????????????????????????????????????????
    setBmr(inputBmr * selectedValue);
    setGoalBodyWeight(bodyweight - targetWeight);
    setTargetBmr(240 * targetWeight);
  };

  // ???????????????
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
        <h1>????????????</h1>
        <div className="">
          <DIV_Form>
            <div className="">
              <div className="">
                <StyledTextFields
                  label="BMR(kcal)???????????????????????????"
                  onChange={(e) => setInputBmr(e.target.value)}
                  value={inputBmr}
                  type="number"
                  variant="outlined"
                />
              </div>
              <div className="">
                <StyledTextFields
                  label="???????????????(kg)???????????????????????????"
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
                  helperText="?????????????????????????????????????????????"
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
                  helperText="??????????????????????????????????????????????????????????????????"
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
              ??? ???????????????
            </Button>
          </DIV_Form>

          <DIV_Result>
            <div className="">
              <h3>????????????????????????</h3>
              <p>{Math.round(bmr)}kcal</p>
            </div>
            <div className="">
              <h3>??????????????????????????????????????????</h3>
              <p>{Math.round(goalBmr)}kcal</p>
            </div>
            <div className="">
              <h3>????????????????????????????????????</h3>
              <p> {Math.round(goalProtein)}g</p>
            </div>
            <div className="">
              <h3>???????????????????????????</h3>
              <p> {Math.round(goalFat)}g</p>
            </div>
            <div className="">
              <h3>?????????????????????????????????</h3>
              <p>{Math.round(goalCarbs)}g</p>
            </div>

            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => addGoalItem()}
            >
              ??? ????????????????????????
            </Button>
          </DIV_Result>

        </div>
      </DIV_Goal>
    </>
  );
};

export default Goal;
