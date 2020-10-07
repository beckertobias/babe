import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Settings from './Settings';
import * as userUtils from '../services/UserService';

const mockUsers = {
  lead: 'Ted Mosby',
  partner: 'Robin Scherbatsky',
};

const mockEditedUsers = {
  lead: 'Lily Aldrin',
  partner: 'Marshall Eriksen'
}

const mockCurrency = {
  currency: '$'
}

const mockEditedCurrency = {
  currency: '£'
}

jest.mock('../services/UserService', () => {
  return {
    editUserDetails: jest.fn((_id, field, value) => Promise.resolve(value)),
  };
});

describe('title and field names', () => {
  test('renders Settings title', () => {
    const container = document.createElement('div');
    ReactDOM.render(<Settings users={mockUsers} />, container);
    expect(container.textContent).toMatch('Settings');
  });

  test('renders user name field', () => {
    const container = document.createElement('div');
    ReactDOM.render(<Settings users={mockUsers} />, container);
    expect(container.textContent).toMatch('Your name');
  })

  test('renders partner name field', () => {
    const container = document.createElement('div');
    ReactDOM.render(<Settings users={mockUsers} />, container);
    expect(container.textContent).toMatch('Your partner');
  })
});

test('should allow editing users and currency', async () => {
  const setUsers = jest.fn(users => users);
  const setCurrency = jest.fn(currency => currency);
  const setIsLoading = jest.fn();
  render(
    <Settings
      users={mockUsers}
      setUsers={setUsers}
      currency={mockCurrency}
      setCurrency={setCurrency}
      setIsLoading={setIsLoading}
    />,
  );

  await wait(() => {
    screen.getByTestId('user-lead');
    screen.getByTestId('user-partner');
  });

  userEvent.type(screen.getByTestId('user-lead'), 'Ted Mosby');
  userEvent.type(screen.getByTestId('user-partner'), 'Robin Scherbatsky');

  userEvent.click(screen.getByText('Save my preferences'));

  setUsers(mockEditedUsers);

  userEvent.type(screen.getByTestId('user-lead'), 'Lily Aldrin');
  userEvent.type(screen.getByTestId('user-partner'), 'Marshall Eriksen');

  userEvent.click(screen.getByText('Save my preferences'));

  expect(userUtils.editUserDetails).toHaveBeenCalledTimes(2);
});