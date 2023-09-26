import React from 'react';

const Footer = () => {
    const date = new Date();
    return (
        <footer>
            <h5>All Right Reserved</h5>
            <p>Copyright © {date.getFullYear()} | Austine Pindro</p>
        </footer>
    );
}

export default Footer;