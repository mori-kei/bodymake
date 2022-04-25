import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import "firebase/auth"
import styled from"styled-components"
import { Container, Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Link as LinkComponent } from "@material-ui/core";
const LoginContainer = styled(Container)`
   width:50%;
  margin: 0 auto;
  max-width :950px;
  padding-top:100px;
`
const DivLoginWrappper = styled.div`
  & h1{
    text-align: center;
  }
`
const Login = ({ history }) => {
  const { login } = useContext(AuthContext);
  //AuthContextからlogin関数を受け取る

  const handleSubmit = event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    login(email.value, password.value, history);
  };
 
  return (
    <DivLoginWrappper>
      <LoginContainer>
        <Typography component="h1" variant="h5">
          Login
          </Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
            input="email"
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs >
              <LinkComponent href="/signup"
              variant="body2"
              >
              サインアップはこちらから
                </LinkComponent>
              </Grid>
          </Grid>
        </form>
      </LoginContainer>


    </DivLoginWrappper>
  );
};


export default Login;