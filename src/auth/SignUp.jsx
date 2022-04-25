import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./AuthProvider";
import { Link } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Link as LinkComponent } from "@material-ui/core";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  width:50%;
  margin: 0 auto;
  max-width :950px;
  padding-top:100px;
`
const DivWrapper  = styled.div`
  & h1{
    text-align: center;
  }
`
const SignUp = ({ history }) => {
  const { signup } = useContext(AuthContext);
  //AuthContextからsignup関数を受け取る
  
  const handleSubmit = event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    signup(email.value, password.value, history);
  };

  return (
    <DivWrapper>
      <StyledContainer>
        <Typography component="h1" variant="h5">
          Sign up
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
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs >
              <LinkComponent href="/login"
              variant="body2"
              >
              サインインはこちらから
                </LinkComponent>
              </Grid>
          </Grid>
        </form>
      </StyledContainer>


    
    </DivWrapper>
  );
};
export default SignUp