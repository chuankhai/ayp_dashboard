import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClaimList() {
    const [claims, setClaims] = useState([]);
    const [selectedClaim, setSelectedClaim] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        async function fetchClaims() {
            try {
                const response = await axios.get('/api/claims');
                console.log(response);
                setClaims(response.data);
            } catch (error) {
                setErrorMessage("Failed to fetch claims. Please try again later.");
            }
        }
        fetchClaims();
    }, []);

    if (errorMessage) {
        return <div>{errorMessage}</div>; // Display the error message if it exists
    }

    if (!claims.length) {
        return <div>Loading...</div>;
    }

    // Getting keys from the first claim to generate headers dynamically.
    const headers = Object.keys(claims[0]);

    // Styles
    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
    };

    const headerStyle = {
        backgroundColor: '#007BFF',
        color: '#ffffff',
        padding: '10px 15px',
    };

    const rowStyle = {
        borderBottom: '1px solid #dddddd',
    };

    const cellStyle = {
        padding: '10px 15px',
        textAlign: 'center',
    };

    const handleRowClick = (claim) => {
        setSelectedClaim(claim);
    };

    return (
        <div>
        <table style={tableStyle}>
            <thead>
                <tr>
                    {headers.slice(0, 4).map((header, index) => (
                        <th key={index} style={headerStyle}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {claims.slice(0, 4).map(claim => (
                    <tr key={claim.id} onClick={() => handleRowClick(claim)} style={{ cursor: 'pointer', }}>
                        {headers.slice(0, 4).map((header, index) => (
                            <td key={index} style={cellStyle}>{claim[header]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        {selectedClaim && (
            <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h3>Details for Claim {selectedClaim.id}</h3>
                {headers.map(header => (
                    <div key={header}>
                        <strong>{header}: </strong>{selectedClaim[header]}
                    </div>
                ))}
                <button onClick={() => setSelectedClaim(null)}>Close Details</button>
            </div>
        )}
        </div>
    );
}

export default ClaimList;
