/* eslint no-console: 0 */

const fetchRequest = (path, options) => {
  return fetch(`http://localhost:3001${path}`, options)
    .then(res => (res.status < 400 ? res : Promise.reject(res)))
    .then(res => res.json())
    .catch(error => console.log('---> Error fetching data from API', error));
};

// get all events from the database, to display as list
const getTransactions = async () => {
  return fetchRequest('/history');
};

const postTransaction = async newTransaction => {
  console.log('attempting to post:', newTransaction);
  return fetchRequest('/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTransaction),
  });
};

module.exports = {
  getTransactions,
  postTransaction,
};