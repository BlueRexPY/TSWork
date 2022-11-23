import React from "react";
import Register from "../../components/auth/Register";

const RegisterPage = () => {
  return (
    <div className="centerFullScreen">
      <Register />
    </div>
  );
};

RegisterPage.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default RegisterPage;
