import React from "react";
import { useState } from "react";
import axiosWithAuth from "../helpers/axiosWithAuth";
import { useHistory } from "react-router";


const initialValues = {username: 'Lambda', passsword: 'School'}


const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

const { push } = useHistory();
const [formValues, setFormValues] = useState(initialValues);
const [error, setError] = useState();


  // const error = "";
  //replace with error state




const handleSumbit = e => {
  e.preventDefault();
  if(formValues.username !== "Lambda" || formValues.passsword !== "School"){
    setError("Username or Password is not correct.")
  }
  axiosWithAuth()
  .post('/api/login', formValues)
  .then((res) => {
    console.log("axios login post", res)
    localStorage.setItem('token', res.data.payload)
    push('/bubblepage')
  })
  .catch((err) => {
    console.log({err})
  })
}

const handleChanges = (e) => {
  setFormValues({
    ...formValues,
    [e.target.username]: e.target.value,
  });
}


  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>
      </div>
      <form >
        <label htmlFor="username">Username</label>
        <input
        id="username"
        data-testid="username"
        name="username"
        value={formValues.username}
        onChange={handleChanges}
        />
        <label htmlFor="password">Password</label>
        <input 
        id="password"
        data-testid="password"
        name="password"
        type="password"
        value={formValues.passsword}
        onChange={handleChanges}
        />
        <button onClick={handleSumbit}> Login</button>
        
        </form>

      <p data-testid="error" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"