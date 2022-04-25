import React from "react";
import styled from "styled-components";
import { Delete } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { makeStyles,createStyles } from '@material-ui/core/styles';
const ListItem = styled.li`
  @media (min-width: 768px) {
    border: 1px solid #eee;
    box-shadow: 1px 0 5px 1px #999;
    border-radius: 5px;
    list-style: none;
    width: 45%;
    padding: 20px 15px;
    box-sizing: border-box;
    margin: 20px 0;
    & p {
      text-align: center;
    }
    & div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & div {
        & span:first-child {
          font-weight: 600;
          margin-right: 5px;
        }
      }
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    border: 1px solid #eee;
    box-shadow: 1px 0 5px 1px #999;
    border-radius: 5px;
    list-style: none;
    padding: 20px 15px;
    box-sizing: border-box;
    margin: 0 auto;
    margin-top: 20px;
    & div {
      & button {
        display: block;
        width: 100%;
        margin: 0 auto;
        margin-top: 30px;
      }
      & div {
        border-bottom: 1px solid #eee;
        margin-top: 5px;
        display: flex;
        justify-content: space-between;

        & span {
          display: inline-block;
        }
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
const FoodItem = ({
  deleteFood,
  foodItem,
  foodText,
  foodCalorie,
  foodProtein,
  foodFat,
  foodCarbs,
  foodWeight,
  thisMonth,
  selectedMonth,
}) => {
  const classes = useStyles()
  const deleteHandler = () => {
    deleteFood(foodItem.docId);
  };
  const showThisMonth = () => {
    return (
      <ListItem>
        <p>
          {foodText} {Number(foodWeight).toLocaleString()}g
        </p>
        <div className="">
          <div className="">
            <span>熱量</span>
            <span>{Number(foodCalorie).toLocaleString()}Kcal</span>
          </div>
          <div className="">
            <span>タンパク質</span>
            <span>{Number(foodProtein).toLocaleString()}g</span>
          </div>
          <div className="">
            <span>脂質</span>
            <span>{Number(foodFat).toLocaleString()}g</span>
          </div>
          <div className="">
            <span>炭水化物</span>{" "}
            <span>{Number(foodCarbs).toLocaleString()}g</span>
          </div>
          <Button className={classes.button} variant="contained" onClick={deleteHandler}>
            <Delete />
          </Button>
        </div>
      </ListItem>
    );
  };

  const showPastMonth = () => {
    return (
      <ListItem>
        <div className="">
          <div className="">熱量{Number(foodCalorie).toLocaleString()}Kcal</div>
          <div className="">
            タンパク質{Number(foodProtein).toLocaleString()}g
          </div>
          <div className="">脂質{Number(foodFat).toLocaleString()}g</div>
          <div className="">炭水化物{Number(foodCarbs).toLocaleString()}g</div>
          <div className="">総量{Number(foodWeight).toLocaleString()}g</div>
          <button onClick={deleteHandler}>
            <Delete />
          </button>
        </div>
      </ListItem>
    );
  };

  return <>{thisMonth === selectedMonth ? showThisMonth() : showPastMonth()}</>;
};

export default FoodItem;
