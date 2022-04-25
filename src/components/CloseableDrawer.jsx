import React from "react";
import { Divider } from "@material-ui/core";
import { Drawer } from "@material-ui/core";
import { List } from "@material-ui/core";

import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { auth } from "../firebase";

const CloseabeleDrawer = ({open, onClose,openModal,openGoal,setOpen,getGoalData}) => {
  const openModalFunc = () => {
    openModal()
    setOpen(!open)
    getGoalData()
  }
  const openGoalFunc = () =>{
    openGoal()
    setOpen(!open)
   
  }
  return(
    <nav>
      <Drawer
     
        variant="temporary"
        anchor="right"
        open={open}
        onClose={onClose}
        ModalProps={{keepMounted:true}}
      >
        <List>
          <ListItem button key="logout">
              <ListItemText primary={"サインアウト"} 
              onClick={() => auth.signOut()}
              />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="logout">
              <ListItemText primary={"目標設定"} 
              onClick={openGoalFunc}
              />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="logout">
              <ListItemText primary={"目標確認"}
                    onClick={openModalFunc}
              />
          </ListItem>
        </List>
      </Drawer>
    </nav>
  )
}

export default CloseabeleDrawer;