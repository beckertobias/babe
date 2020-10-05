import React, { useState } from 'react';
import { navigate } from '@reach/router';
import {
  MainViewStatic,
  FormSection,
  FormLabel,
  FormInput,
  FormButton,
} from '../theme';

import UserService from '../services/UserService';
import authentication from '../authentication';

import firebase from '../firebase/config';

import * as firebaseui from 'firebaseui';

const initialState = {
  email: '',
  password: '',
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
        .then(result => {
          console.log(result);
          console.log(result.user);
          navigate('/dashboard', {
            replace: true,
          });
        })
        .catch(e => console.log(e));
    });
};

//   try {
//     console.log('google');
//     const uiConfig = {
//       signInSuccessUrl: '<http://localhost:3000/dashboard>',
//       signInOptions: [
//         // Leave the lines as is for the providers you want to offer your users.
//         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       ],
//       //tosUrl and privacyPolicyUrl accept either url string or a callback
//       //function.
//       //Terms of service url/callback.
//       tosUrl: '<your-tos-url>',
//       //Privacy policy url/callback.
//       privacyPolicyUrl: function () {
//         window.location.assign('<your-privacy-policy-url>');
//       },
//     };

//     // Initialize the FirebaseUI Widget using Firebase.
//     var ui = new firebaseui.auth.AuthUI(firebase.auth());
//     // The start method will wait until the DOM is loaded.
//     ui.start('#firebaseui-auth-container', uiConfig);
//   } catch (e) {
//     console.log(e);
//   }
// };

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

  // const handleSubmit = async event => {
  //   event.preventDefault();
  //   const { email } = state;
  //   const user = { email };
  //   const result = await UserService.login(user);
  //   try {
  //     const { accessToken } = result;
  //     localStorage.setItem('accessToken', accessToken);
  //     setIsAuthenticated(true);
  //     setIsLoading(true);
  //     authentication.login(() => navigate('/', { replace: true }));
  //   } catch (error) {
  //     alert('Your email or password is incorrect. Please try again.');
  //     setState(initialState);
  //   }
  // };

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
