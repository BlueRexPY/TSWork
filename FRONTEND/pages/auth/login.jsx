import React from "react";
import Login from "../../components/auth/Login";

const LoginPage = () => {
  return (
    <div className="centerFullScreen">
      <Login />
    </div>
  );
};

LoginPage.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default LoginPage;
