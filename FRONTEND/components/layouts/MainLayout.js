import React from "react";
import PropTypes from "prop-types";
import styles from "./Layout.module.css";
import NavBar from "../navBar";

const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className={styles.container}>{children}</div>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
