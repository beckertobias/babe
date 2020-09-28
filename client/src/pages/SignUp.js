import React, { useState } from 'react';
import { navigate } from '@reach/router';
import {
  MainView,
  FormSection,
  FormLabel,
  FormInput,
  FormButton,
  FormRadio,
} from '../theme';

import UserService from '../services/UserService';
import authentication from '../authentication';

const initialState = {
  email: '',
  password: '',
  name: '',
  partner: '',
  partnerEmail: '',
  currency: '',
};

const SignUp = ({ setIsAuthenticated }) => {
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
    const { email, password, name, partner, currency, partnerEmail } = state;
    const newUser = { email, password, name, partner, partnerEmail, currency };
    const result = await UserService.signup(newUser);

    if (result.error) {
      alert(
        `There is already a Babe account associated with ${email}. Please re-register with another email.`,
      );
      setState(initialState);
    } else {
      const { accessToken } = result;
      localStorage.setItem('accessToken', accessToken);
      setIsAuthenticated(true);
      authentication.login(() => navigate('/', { replace: true }));
    }
  };

  return (
    <MainView>
      <h4>
        <span role="img" aria-label="technologist emoji">
          🧑‍💻
        </span>
        Sign Up
        <span role="img" aria-label="technologist emoji">
          🧑‍💻
        </span>
      </h4>
      <form onSubmit={handleSubmit}>
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
        <FormSection onChange={handleChange}>
          <FormRadio type="radio" name="currency" value="£" required />
          <FormLabel htmlFor="currency">
            <span role="img" aria-label="pounds emoji">
              💷
            </span>
          </FormLabel>
          <FormRadio type="radio" name="currency" value="$" required />
          <FormLabel htmlFor="currency">
            <span role="img" aria-label="dollars emoji">
              💵
            </span>
          </FormLabel>
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
          <FormLabel htmlFor="partner-email">Partner&apos;s email:</FormLabel>
          <FormInput
            type="text"
            name="partner-email"
            value={state.partnerEmail}
            onChange={handleChange}
            required
          />
        </FormSection>
        <FormButton type="submit">Sign me up</FormButton>
      </form>
    </MainView>
  );
};

export default SignUp;
