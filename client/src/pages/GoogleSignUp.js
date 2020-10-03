import React, { useState, useContext } from 'react';
import AuthContext from '../auth/auth';
import * as firebase from 'firebase';
//import { navigate } from '@reach/router';

const GoogleSignUp = () => {
  const Auth = useContext(AuthContext);

  const handleGoogleLogin = () => {
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
            console.log(result.additionalUserInfo.profile);
            console.log(result.additionalUserInfo.profile.email);
            console.log(result.additionalUserInfo.profile.family_name);
            console.log(result.additionalUserInfo.profile.given_name);
            Auth.setLoggedIn(true);
          })
          .catch(e => console.log(e));
      });
  };

  return (
    <button
      onClick={() => handleGoogleLogin()}
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
};

export default GoogleSignUp;