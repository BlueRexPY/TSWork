import { Button } from "antd";
import Link from "next/link";
import React from "react";

const VacanciesLegendCrm = () => {
  return (
    <>
      <div className="VacanciesLegendCrm">
        <h3>Your vacancies:</h3>
        <Link target="_blank" href="/crm/create">
          <Button size="large" type="default">
            Create new
          </Button>
        </Link>
      </div>
    </>
  );
};

export default VacanciesLegendCrm;
