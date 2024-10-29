import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/friends')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(Array.isArray(data) ? data : [data]); // Ensure data is an array
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
      <h1>Data from Flask API</h1>
      {data.map((item, index) => (
        <div 
          key={index} 
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            width: '200px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2>Card {index + 1}</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {Object.entries(item).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
