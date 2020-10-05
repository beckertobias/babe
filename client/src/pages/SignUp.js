import React, { useState } from 'react';
import { navigate } from '@reach/router';
import {
  MainView,
  FormSection,
  FormLabel,
  RadioLabel,
  FormInput,
  FormButton,
  FormRadio,
} from '../theme';

import UserService from '../services/UserService';
import authentication from '../authentication';

//REDUX
import { useSelector, useDispatch } from 'react-redux';

const initialState = {
  partner: '',
  partnerEmail: '',
  currency: '',
};

const SignUp = ({ setIsAuthenticated, setIsLoading }) => {
  //REDUX
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const [state, setState] = useState(initialState);

  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const { partner, currency, partnerEmail } = state;

    dispatch({
      type: 'ADD_PARTNER',
      partnerEmail,
      partner,
      currency,
    });
    const newUser = {
      email: user.email,
      name: user.name,
      partnerEmail: partnerEmail,
      partner: partner,
      currency: currency,
    };
    try {
      const result = await UserService.signup(newUser);
      const { accessToken } = result;
      localStorage.setItem('accessToken', accessToken);
      dispatch({
        type: 'AUTH',
        auth: true,
      });
      setIsAuthenticated(true); // TODO: refer to firebase
      setIsLoading(true);
      authentication.login(() => navigate('/', { replace: true }));
    } catch (error) {
      alert(
        `There is an account already registered with ${user.email}. Please use a different email address or log in.`,
      );
      setState(initialState);
    }
  };

  return (
    <MainView>
      <h4>
        <span role="img" aria-label="wave emoji">
          👋
        </span>
        Sign up
        <span role="img" aria-label="wave emoji">
          👋
        </span>
      </h4>
      <br />
      <form onSubmit={handleSubmit}>
        <FormSection onChange={handleChange}>
          <FormRadio type="radio" name="currency" value="£" required />
          <RadioLabel htmlFor="currency">
            <span role="img" aria-label="pounds emoji">
              💷
            </span>
          </RadioLabel>
          <FormRadio type="radio" name="currency" value="$" required />
          <RadioLabel htmlFor="currency">
            <span role="img" aria-label="dollars emoji">
              💵
            </span>
          </RadioLabel>
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="name">Your name:</FormLabel>
          <FormInput
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
          />
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="partner">Partner&apos;s name:</FormLabel>
          <FormInput
            type="text"
            name="partner"
            value={state.partner}
            onChange={handleChange}
            required
          />
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="partnerEmail">Partner&apos;s email:</FormLabel>
          <FormInput
            type="text"
            name="partnerEmail"
            value={state.partnerEmail}
            onChange={handleChange}
            required
          />
        </FormSection>
        <FormButton type="submit">Let&apos;s get started</FormButton>
      </form>
    </MainView>
  );
};

export default SignUp;
