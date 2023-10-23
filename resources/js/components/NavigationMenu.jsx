import React from 'react';

const navStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 20px',
};

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 15px',
    padding: '5px 10px',
    border: '1px solid white',
    borderRadius: '5px',
    transition: 'background-color 0.3s',

    ':hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
};

const NavigationMenu = () => (
    <div style={navStyle}>
        <a href="/" style={linkStyle}>Home</a>
        <a href="/create" style={linkStyle}>New Claim</a>
    </div>
);

export default NavigationMenu;
