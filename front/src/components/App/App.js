import React from 'react';
import styles from './App.module.css';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

const App = (props) => {

  let func = props.func;
  let component = <HomePage />

  if (func === "home") {
    component = <HomePage />;
  } else if (func === "login") {
    component = <LoginPage />;
  } else if (func === "register") {
    component = <RegisterPage />;
  }
  
  return (
<div className={styles.App}>
  <header>
    {component}
  </header>
</div>
)
};

export default App;
