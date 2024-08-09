import React, { useState } from 'react';

const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <h1>HR Matic</h1>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
                
            </div>
            <div className="notification">
                <span></span>
                <i className="fas fa-bell"></i>
                
            </div>
        </div>
    );
};

export default Header;
