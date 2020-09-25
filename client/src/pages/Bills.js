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
} from '../theme';

import APIService from '../services/APIService';

const Bills = ({ users, currency, setTransactions }) => {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [lender, setLender] = useState('');
  const [split, setSplit] = useState(50);

  const [isCustomising, setIsCustomising] = useState(false);

  const saveTransaction = transaction => {
    APIService.postTransaction(transaction)
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
    const date = new Date().toDateString();
    const newTransaction = { item, amount, date, lender, split };
    saveTransaction(newTransaction);
    setItem('');
    setAmount('');
    setLender('');
    setSplit(50);
  };

  return (
    <MainView>
      <form onSubmit={submit}>
        <FormSection>
          <FormLabel htmlFor="bill-item">What is it for?</FormLabel>
          <FormInput
            type="text"
            name="bill-item"
            placeholder="Pints with Gesh 🍻"
            onChange={event => setItem(event.target.value)}
            value={item}
            required
          />
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="bill-amount">How much?</FormLabel>
          <span>{currency}</span>
          <FormInput
            type="number"
            min="0"
            step="0.01"
            placeholder="18.50"
            name="bill-amount"
            onChange={event => setAmount(event.target.value)}
            value={amount}
            required
          />
        </FormSection>
        <FormSection onChange={event => setLender(event.target.value)}>
          <FormRadio
            type="radio"
            name="bill-lender"
            value={users.lead}
            required
          />
          <FormLabel htmlFor="bill-lender">I paid</FormLabel>
          <FormRadio type="radio" name="bill-lender" value={users.partner} />
          <FormLabel htmlFor="bill-lender">{users.partner} paid</FormLabel>
        </FormSection>
        <FormSection>
          <FormRadio
            type="radio"
            name="bill-split"
            value={false}
            onChange={() => setIsCustomising(!isCustomising)}
            defaultChecked
            required
          />
          <FormLabel htmlFor="bill-lender">Half each</FormLabel>
          <FormRadio
            type="radio"
            name="bill-split"
            value={true}
            onChange={() => setIsCustomising(!isCustomising)}
          />
          <FormLabel htmlFor="bill-lender">Customise</FormLabel>
        </FormSection>
        {isCustomising && (
          <FormSection>
            <FormLabel htmlFor="bill-proportion">
              {split}% mine, {100 - split}% {users.partner}&apos;s
            </FormLabel>
            <FormSlider
              type="range"
              name="bill-proportion"
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

export default Bills;