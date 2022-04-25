import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { makeStyles,createStyles } from '@material-ui/core/styles';
const DIV_Overlay = styled.div`
  @media (min-width: 768px) {
    /*　画面全体を覆う設定　*/
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index:5;
    /*　画面の中央に要素を表示させる設定　*/
    display: flex;
    align-items: center;
    justify-content: center;
    & div {
      z-index: 2;
      width: 50%;
      padding: 1em;
      background: #fff;
      & button{
        display: block;
      width: 300px;
      margin: 0 auto;
      margin-top: 25px;
      }
    }
  }
  @media (max-width: 768px) {
    /*　画面全体を覆う設定　*/
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index:5;
    /*　画面の中央に要素を表示させる設定　*/
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom:20px;
    & div {
      z-index: 2;
      padding:10px 5px;
     
      background: #fff;
      & button{
        display: block;
      width: 300px;
      margin: 0 auto;
      margin-top: 25px;
      }
    }
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
const Modal = ({ show, setShow, goalItems }) => {
  const classes = useStyles()
  const closeModal = () => {
    setShow(false);
  };
  if (show) {
    if (goalItems !== undefined) {
      return (
        <DIV_Overlay onClick={closeModal}>
          <div id="content" onClick={(e) => e.stopPropagation()}>
            <div className="">
              <div className="">
                <h3>体重</h3>
                <p>{goalItems.goalBodyWeight}kg</p>
              </div>
              <div className="">
                <h3>カロリー</h3>
                <p>{Math.round(goalItems.goalBmr)}kcal</p>
              </div>
              <div className="">
                <h3>タンパク質量</h3>
                <p>{Math.round(goalItems.goalProtein)}g</p>
              </div>
              <div className="">
                <h3>脂質量</h3>
                <p>{Math.round(goalItems.goalFat)}g</p>
              </div>
              <div className="">
                <h3>炭水化物量</h3>
                <p>{Math.round(goalItems.goalCarbs)}g</p>
              </div>
            </div>
            
            <Button
             className={classes.button}
              variant="contained"
              color="primary"
              onClick={closeModal}
            >
              閉じる
            </Button>
            
            
          </div>
        </DIV_Overlay>
      );
    } else {
      return (
        <DIV_Overlay onClick={closeModal}>
          <div id="content" onClick={(e) => e.stopPropagation()}>
            <p>目標を設定してください</p>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={closeModal}
            >
              閉じる
            </Button>
          </div>
        </DIV_Overlay>
      );
    }
  } else {
    return null;
  }
};

export default Modal;
