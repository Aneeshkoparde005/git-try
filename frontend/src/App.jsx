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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#f9fafb',
      minHeight: '100vh',
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      color: '#333'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        color: '#4f46e5',
        marginBottom: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
      }}>Data from Flask API</h1>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1200px',
      }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '20px',
              width: '280px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              border: '1px solid #e5e7eb',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
            }}
          >
            <h2 style={{
              fontSize: '1.25rem',
              color: '#374151',
              marginBottom: '10px',
              borderBottom: '2px solid #4f46e5',
              paddingBottom: '5px'
            }}>Card {index + 1}</h2>
            <ul style={{
              listStyleType: 'none',
              padding: 0,
              margin: 0,
              color: '#6b7280'
            }}>
              {Object.entries(item).map(([key, value]) => (
                <li key={key} style={{ marginBottom: '8px' }}>
                  <strong style={{ color: '#4f46e5' }}>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
