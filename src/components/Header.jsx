import React, { useCallback, useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Button } from "@material-ui/core";
import CloseabeleDrawer from "./CloseableDrawer";
import styled from "styled-components";
import Modal from "./Modal";
import { makeStyles,createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from "react";
const StyledButton = styled(Button)`
  @media (min-width: 768px) {
    width: 200px;
  }
  @media (max-width: 768px) {
    width: 35%;
    & span {
      font-size: 8px;
    }
  }
`;
const DIV_Header = styled.div`
  @media (min-width: 768px) {
    max-width: 100%;
    color: #333;
    border: 1px solid #333;
    & h1 {
      font-size: 64px;
    }
    & div:first-child {
      width: 1280px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
    & h1 {
      font-size: 32px;
    }
    & div:first-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #333;
      margin-bottom: 50px;
    }
  }
`;

const DIV_Month = styled.div`
  @media (min-width: 768px) {
    background-color: #a4cbb9;
    display: flex;
    border: 1px solid #333;
    width: 1280px;
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
    width: 75%;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
  }
  & button {
    width: 25%;
    height: 50px;
  }
`;
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      color: "#388e3c",
      backgroundColor: "#81c784"
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      textAlign: "center"
    }
  })
);
const Header = ({ date, setPrevMonth, setNextMonth,goalItems,openGoal,closeGoal,getGoalData}) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const today = date;
  const [show, setShow] = useState(false)
  const [open,setOpen] = useState(false);
  const handleDrawerToggle = useCallback((event) =>{
      if (event.type ==='keydown' && (event.key === 'Tab' || event.key === 'Shift')){
        return;
      }
      setOpen(!open)
  },[setOpen, open])
  const openModal = () => {
    setShow(true)
  }
  return (
   
    <>
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          
          <Typography variant="h6" className={classes.title} onClick={closeGoal}>
            BodyMakeApp
          </Typography>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <CloseabeleDrawer open={open} onClose={handleDrawerToggle} openModal={openModal} openGoal={openGoal} setOpen={setOpen} getGoalData={getGoalData}/>
      </AppBar>
    </div>
     
          <Modal show={show} setShow={setShow} goalItems={goalItems}/>
       

     
    </>
  );
};

export default Header;
