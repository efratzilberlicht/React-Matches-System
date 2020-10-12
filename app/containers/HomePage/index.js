import React from 'react';
import 'style.scss';
import logo from './kidoushin_logo.png';

export default function HomePage() {
  return (
    <div className="container">
      <img id="logoHomePage" src={logo} alt="logo" />
    </div>
  );
}
