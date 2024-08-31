import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TransactionHistory = () => {
  const { address } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/transactions/${address}`);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transaction history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [address]);

  return (
    <div className="container mt-5" style={{ backgroundColor: '#3D3A4A', color: '#FF204E' }}> {/* Dark background with neon blue text */}
      <h1 className="text-center"  style={{ color: '#FF204E' }}>Transaction History for {address}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-group">
          {transactions.map((tx, index) => (
            <li key={index} className="list-group-item" style={{ backgroundColor: '#3D3A4A', color: '#FF204E' }}>
              From: {tx.from} <br />
              To: {tx.to} <br />
              Amount: {tx.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistory;
