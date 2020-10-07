/*eslint-disable-next-line no-unused-vars*/
import React, { useState } from 'react';
import {
  MainView,
  FormLabel,
  FormInput,
  FormRadio,
  FormButton,
  FormSection,
  FormSlider,
  SliderLabel,
} from '../theme';

import TransactionService from '../services/TransactionService';
import { navigate } from '@reach/router';

const Transactions = ({
  users,
  currency,
  setTransactions,
  isLoading,
  setIsLoading,
}) => {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [lender, setLender] = useState('');
  const [split, setSplit] = useState(50);

  const [isCustomising, setIsCustomising] = useState(false);

  const saveTransaction = transaction => {
    TransactionService.postTransaction(transaction)
      .then(newTransaction =>
        setTransactions(oldTransactions => [
          ...oldTransactions,
          newTransaction,
        ]),
      )
      .catch(error => {
        throw Error('error posting transaction to database');
      });
  };

  const submit = event => {
    event.preventDefault();
    const date = new Date();
    const addedBy = users.leadEmail;
    const newTransaction = { item, amount, date, lender, split, addedBy };
    saveTransaction(newTransaction);
    setIsLoading(true);
    navigate('/');
  };

  return (
    <MainView>
      <h4>
        <span role="img" aria-label="cartwheel emoji">
          🤸🏼
        </span>
        Split a bill
        <span role="img" aria-label="cartwheel emoji">
          🤸🏼
        </span>
      </h4>
      <form onSubmit={submit}>
        <FormSection>
          <FormLabel htmlFor="billItem">What is it for?</FormLabel>
          <FormInput
            type="text"
            name="billItem"
            data-testid="billItem"
            id="billItem"
            placeholder="Pints with Gesh 🍻"
            onChange={event => setItem(event.target.value)}
            value={item}
            required
          />
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="billAmount">How much?</FormLabel>
          <span>{currency}</span>
          <FormInput
            type="number"
            min="0"
            step="0.01"
            placeholder="18.50"
            name="billAmount"
            data-testid="billAmount"
            id="billAmount"
            onChange={event => setAmount(event.target.value)}
            value={amount}
            required
          />
        </FormSection>
        <FormSection onChange={event => setLender(event.target.value)}>
          <FormRadio
            type="radio"
            name="billLender"
            value={users.leadEmail}
            required
          />
          <FormLabel htmlFor="billLender">I paid</FormLabel>
          <FormRadio
            type="radio"
            name="billLender"
            id="billLender"
            value={users.partnerEmail}
          />
          <FormLabel htmlFor="billLender">{users.partner} paid</FormLabel>
        </FormSection>
        <FormSection>
          <FormRadio
            type="radio"
            name="billSplit"
            value={false}
            onChange={() => setIsCustomising(!isCustomising)}
            defaultChecked
            required
          />
          <FormLabel htmlFor="billLender">Half each</FormLabel>
          <FormRadio
            type="radio"
            name="billSplit"
            value={true}
            onChange={() => setIsCustomising(!isCustomising)}
          />
          <FormLabel htmlFor="billLender">Customise</FormLabel>
        </FormSection>
        {isCustomising && (
          <FormSection>
            <SliderLabel htmlFor="billProportion">
              {split}% mine, {100 - split}% {users.partner}&apos;s
            </SliderLabel>
            <FormSlider
              type="range"
              name="billProportion"
              min="0"
              max="100"
              step="10"
              onChange={event => setSplit(event.target.value)}
            />
          </FormSection>
        )}
        <FormSection>
          <FormButton type="submit">Split</FormButton>
        </FormSection>
      </form>
    </MainView>
  );
};

export default Transactions;
