import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import styled from"styled-components";
import { Button } from "@material-ui/core";
import { makeStyles,createStyles } from '@material-ui/core/styles';
const DIV_Month = styled.div`
  @media (min-width: 768px) {
    background-color: #d1ede1;
    display: flex;
    border: 1px solid #333;
    max-width: 1280px;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
    box-sizing: border-box;
    margin-bottom: 50px;
    margin-top: 100px;
    & button {
      width: 125px;
      height: 35px;
      font-size: 16px;
      font-weight: bold;
    }
  }
  @media (max-width: 768px) {
    display: flex;
    width: 85%;
    margin: 0 auto;
    margin-top:50px;
    justify-content: space-between;
    align-items: center;
  }
  & button {
    width: 20%;
    height: 50px;
   
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
const Dates = ({date,setPrevDate,setNextDate}) => {
  const today = date;
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const dates = today.getDate();
  const classes = useStyles()
  const {currentUser} = useContext(AuthContext)
  return (
    <>
      <DIV_Month>
        <Button
          className={classes.button}
          variant="contained"
          type="submit"
          onClick={() => setPrevDate()}
        >
          前日
        </Button>

        <h2>
          {year}年{month}月{dates}日
        </h2>
        <Button className={classes.button}
          color="pallete.success.dark"
          variant="contained"
          type="submit"
          onClick={() => setNextDate()}
        >
          次日
        </Button>
      </DIV_Month>
    </>
  )
}

export default Dates;