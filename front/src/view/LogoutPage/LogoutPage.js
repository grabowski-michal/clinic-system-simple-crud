import React from 'react';
import PropTypes from 'prop-types';
import styles from './LogoutPage.module.css';
import { Navigate } from "react-router-dom";

import Authenticator from '../../controllers/Authenticator/Authenticator';

const LogoutPage = () => {
  let navigateComponent = "";

  Authenticator.handleLogout();
  navigateComponent = <Navigate to="/" replace={true} />;

  return (
  <div className={styles.LogoutPage}>
    { navigateComponent }
  </div>
  )
};

LogoutPage.propTypes = {};

LogoutPage.defaultProps = {};

export default LogoutPage;
