import React, { useState, useEffect } from 'react';

// GET COMPONENTS
import Head from './components/Head';
import Header from './components/Header';
import PageContainer from './components/PageContainer';
import Footer from './components/Footer';
import { MainViewStatic } from './theme';

// GET SERVICES
import TransactionService from './services/TransactionService';
import UserService from './services/UserService';
import authentication from './authentication';

//AUTH
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

function App(props) {
  // SET STATE
  const currentAuthentication = authentication.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(currentAuthentication);
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrency] = useState('');
  const [users, setUsers] = useState({
    _id: '',
    lead: '',
    leadEmail: '',
    partner: '',
    partnerEmail: '',
  });
  const [summary, setSummary] = useState({
    balance: 0,
    totalOwed: 0,
    overallLender: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  //AUTH
  const { user, signOut, signInWithGoogle } = props;

  const retrieveUserInfo = async accessToken => {
    try {
      const userInfo = await UserService.loadUserDetails(accessToken);
      const { _id, email, name, partner, partnerEmail, currency } = userInfo;
      setUsers({ _id, lead: name, leadEmail: email, partner, partnerEmail });
      setCurrency(currency);
    } catch (error) {
      console.log('---> Unable to retrieve user data', error); // eslint-disable-line no-console
    }
  };

  const calculateSummary = () => {
    if (transactions) {
      const balance = transactions.reduce((acc, transaction) => {
        if (transaction.lender === users.leadEmail)
          return acc + (transaction.amount * (100 - transaction.split)) / 100;
        else if (transaction.lender === users.partnerEmail)
          return acc - transaction.amount * (transaction.split / 100);
        else {
          const remaining = transaction.amount * transaction.split;
          return acc - remaining;
        }
      }, 0);
      const overallLender = balance > 0 ? users.lead : users.partner;
      const totalOwed = Math.abs(Math.round(balance));
      setSummary({ balance, totalOwed, overallLender });
    }
  };

  // LOAD DASHBOARD INFO
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) retrieveUserInfo(accessToken);
    if (users._id) {
      setIsAuthenticated(authentication.isAuthenticated());
      TransactionService.getTransactions(users._id)
        .then(dbTransactions => setTransactions(dbTransactions))
        .catch(error => console.log('---> Error loading user history', error)); // eslint-disable-line no-console
      calculateSummary();
    }
    setIsLoading(false);
  }, [
    users._id,
    users.lead,
    users.partner,
    transactions.length,
    summary.balance,
    summary.totalOwed,
    summary.overallLender,
    isLoading,
    isAuthenticated,
  ]);
  console.log(user);

  // LOAD MAIN PAGE LAYOUT
  return (
    <div className="App">
      <header className="App-header">
        {user ? <p>Hello, {user.displayName}</p> : <p>Please sign in.</p>}
        {user ? (
          <button onClick={signOut}>Sign out</button>
        ) : (
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        )}
      </header>
    </div>
  );
  // <main>
  //   <Head />
  //   <Header />
  //   {isLoading ? (
  //     <MainViewStatic></MainViewStatic>
  //   ) : (
  //     <PageContainer
  //       summary={summary}
  //       users={users}
  //       setUsers={setUsers}
  //       transactions={transactions}
  //       setTransactions={setTransactions}
  //       currency={currency}
  //       setCurrency={setCurrency}
  //       isAuthenticated={isAuthenticated}
  //       setIsAuthenticated={setIsAuthenticated}
  //       setIsLoading={setIsLoading}
  //     />
  //   )}
  //   <Footer isAuthenticated={isAuthenticated} />
  // </main>
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
