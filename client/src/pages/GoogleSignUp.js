import React, { useState, useContext } from 'react';
import * as firebase from 'firebase';
import { navigate } from '@reach/router';
import fire from '../firebase/config';
import uiConfig from '../firebase/firebaseui';

//REDUX
import { useSelector, useDispatch } from 'react-redux';

// const signup = (user, dispatch) => {
const handleGoogleLogin = (user, dispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          dispatch({
            type: 'ADD_FIRST_USER',
            email: result.additionalUserInfo.profile.email,
            name: result.additionalUserInfo.profile.given_name,
          });
          navigate('/sign-up', {
            replace: true,
          });
        })
        .catch(e => console.log(e));
    });
};

function GoogleSignUp() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => handleGoogleLogin(user, dispatch)}
      className="googleBtn"
      type="button"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        alt="logo"
      />
      Join With Google
    </button>
  );
}

export default GoogleSignUp;
