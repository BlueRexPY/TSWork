import React from "react";
import AnimatedLogo from "../components/utils/AnimatedLogo";
import { Button } from "antd";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="center">
      <AnimatedLogo center={false} />
      <h1>Page not found</h1>
      <Link href="/">
        <Button type="primary" size="large">
          Go Back
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
