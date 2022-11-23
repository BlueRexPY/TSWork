import React from "react";
import GuardLayout from "../components/layouts/LayoutGuard";
import Trend from "../components/trend";

const HomePage = () => {
  return <Trend />;
};

HomePage.getLayout = function getLayout(page) {
  return <GuardLayout>{page}</GuardLayout>;
};

export default HomePage;
