import React, { useState } from 'react';
import { navigate } from '@reach/router';
import {
  MainViewStatic,
  FormSection,
  FormLabel,
  FormInput,
  FormButton,
} from '../theme';

import firebase from '../firebase/config';
import UserService from '../services/UserService';
import uiConfig from '../firebase/firebaseui';

const fire = require('firebase');
const firebaseui = require('firebaseui');
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const initialState = {
  email: '',
  password: '',
};

// const handleSubmit = async email => {
//   const user = { email };
//   const result = await UserService.login(user);
//   try {
//     const { accessToken } = result;
//     localStorage.setItem('accessToken', accessToken);
//   } catch (error) {
//     alert('Your email or password is incorrect. Please try again.');
//   }
// };

ui.start('#firebaseui-auth-container', uiConfig);

let returnDiv;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(user.uid);
    returnDiv = (
      <div>
        <span>You are Logged In</span>
        <buttton onClick={() => navigate('/dashboard', { replace: true })}>
          Return to Home
        </buttton>
      </div>
    );
  } else {
    console.log('no user hyet');
  }
});

const Login = ({ setIsAuthenticated, setIsLoading }) => {
  const [state, setState] = useState(initialState);
  // const user = fire.auth().currentUser;

  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <MainViewStatic>
      {returnDiv ? (
        returnDiv
      ) : (
        <div>
          <h4>
            <span role="img" aria-label="technologist emoji">
              🧑‍💻
            </span>
            Login
            <span role="img" aria-label="technologist emoji">
              🧑‍💻
            </span>
          </h4>
          <div id="firebaseui-auth-container"></div>
          <div id="loader">Loading...</div>
        </div>
      )}
    </MainViewStatic>
  );
};

export default Login;
