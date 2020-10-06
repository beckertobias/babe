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

const initialState = {
  email: '',
  password: '',
};

const handleSubmit = async email => {
  const user = { email };
  const result = await UserService.login(user);
  try {
    const { accessToken } = result;
    localStorage.setItem('accessToken', accessToken);
  } catch (error) {
    alert('Your email or password is incorrect. Please try again.');
  }
};

const handleGoogleLogin = e => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => handleSubmit(result.additionalUserInfo.profile.email))
        .then(result => {
          navigate('/dashboard', {
            replace: true,
          });
        })
        .catch(e => console.log(e));
    });
};

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
      <h4>
        <span role="img" aria-label="technologist emoji">
          🧑‍💻
        </span>
        Login
        <span role="img" aria-label="technologist emoji">
          🧑‍💻
        </span>
      </h4>
      <form onSubmit={handleGoogleLogin}>
        <FormSection>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <FormInput
            type="text"
            name="email"
            value={state.email}
            onChange={handleChange}
            required
          />
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="password">Password:</FormLabel>
          <FormInput
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            required
          />
        </FormSection>
        <FormSection>
          <FormButton type="submit">Show me the money</FormButton>
        </FormSection>
      </form>
    </MainViewStatic>
  );
};

export default Login;
