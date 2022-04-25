import React from "react";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles,createStyles } from "@material-ui/core";


const DivForm = styled.div`
  @media (min-width: 768px) {
    width: 1280px;
    margin: 0 auto;
    & p {
      text-align: center;
      font-size: 32px;
    }
    & div {
      display: flex;
      justify-content: space-between;
    }
  }
  @media (max-width: 768px) {
    max-width: 80%;
    margin: 0 auto;
    text-align: center;
    margin-top: 50px;
    & p {
      font-size: 16px;
      font-weight: 600;
    }
    & div{
      & div{
        margin-top:10px;
        text-align: center
      }
    }
  }
`;
const StyledTextField = styled(TextField)`
  @media (min-width: 768px) {
    width: 180px;
   
  }
  @media (max-width: 768px) {
    width:80%;
   
  }
`;
const StyledAddButton = styled(Button)`
@media (max-width: 768px) {
  width:80%;

  }
`
const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      color: "#333",
      backgroundColor: "#81c784",
      "&:hover": {
        background: "#2A6041"
      },
    },
    textField: {
      color:"red"
    }
  })
);

const AddItem = ({
  addFoodItem,
  inputText,
  setInputText,
  inputCalorie,
  setInputCalorie,
  inputProtein,
  setInputProtein,
  inputFat,
  setInputFat,
  inputCarbs,
  setInputCarbs,
  inputWeight,
  setInputWeight,
  selectedMonth,
  thisMonth,
}) => {
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const inputCalorieHandler = (e) => {
    setInputCalorie(parseInt(e.target.value));
  };
  const inputProteinHandler = (e) => {
    setInputProtein(parseInt(e.target.value));
  };
  const inputFatHandler = (e) => {
    setInputFat(parseInt(e.target.value));
  };
  const inputCarbsHandler = (e) => {
    setInputCarbs(parseInt(e.target.value));
  };
  const inputWeightHandler = (e) => {
    setInputWeight(parseInt(e.target.value))
  }
  const reset = () => {
    setInputText("");
    setInputCalorie("");
    setInputProtein("");
    setInputFat("");
    setInputCarbs("");
    setInputWeight("");
  };
  const classes= useStyles()
  const submitItemHandler = (e) => {
    e.preventDefault();
    addFoodItem(inputText, inputCalorie, inputProtein, inputFat, inputCarbs,inputWeight);
    reset();
  };

  const thisMonthForm = () => {
    return (
      <DivForm>
        <p>食べたものを追加</p>
        <div className="">
          <div className="">
            <StyledTextField
             className={classes.textField}
              label="名称"
              onChange={inputTextHandler}
              value={inputText}
              type="text"
              variant="outlined"
            />
          </div>
          <div className="">
            <StyledTextField
              
              label="カロリー (kcal)"
              onChange={inputCalorieHandler}
              value={inputCalorie}
              type="number"
              variant="outlined"
            />
          </div>
          <div className="">
            <StyledTextField
              label="タンパク質 (g)"
              onChange={inputProteinHandler}
              value={inputProtein}
              type="number"
              variant="outlined"
            />
          </div>
          <div className="">
          <StyledTextField
            label="脂質 (g)"
            onChange={inputFatHandler}
            value={inputFat}
            type="number"
            variant="outlined"
          />
            </div>
          <div className="">
          <StyledTextField
            label="炭水化物 (g)"
            onChange={inputCarbsHandler}
            value={inputCarbs}
            type="number"
            variant="outlined"
          />  
          </div>
          <div className="">
          <StyledTextField
            label="総量 (g)"
            onChange={inputWeightHandler}
            value={inputWeight}
            type="number"
            variant="outlined"
          />  
          </div>
          <div className="">
            <StyledAddButton
            className={classes.button}
              color="primary"
              variant="contained"
              type="submit"
              onClick={submitItemHandler}
            >
              <Add />
            </StyledAddButton>
          </div>
        </div>
        {/* <div>
          <DivFormChild>
            <label htmlFor="">名称</label>
            <input type="text" value={inputText} onChange={inputTextHandler} />
          </DivFormChild>
          <DivFormChild>
            <label htmlFor="">カロリー</label>
            <input
              type="number"
              value={inputCalorie}
              onChange={inputCalorieHandler}
            />
          </DivFormChild>
          <DivFormChild>
            <label htmlFor="">タンパク質</label>
            <input
              type="number"
              value={inputProtein}
              onChange={inputProteinHandler}
            />
          </DivFormChild>
          <DivFormChild>
            <label htmlFor="">脂質</label>
            <input type="number" value={inputFat} onChange={inputFatHandler} />
          </DivFormChild>
          <DivFormChild>
            <label htmlFor="">炭水化物</label>
            <input
              type="number"
              value={inputCarbs}
              onChange={inputCarbsHandler}
            />
          </DivFormChild>
          <button type="submit" onClick={submitItemHandler}>
            追加
          </button>
        </div> */}
      </DivForm>
    );
  };
  const otherMonthForm = () => {
    return <form></form>;
  };
  return (
    <>{thisMonth === selectedMonth ? thisMonthForm() : otherMonthForm()}</>
  );
};

export default AddItem;
