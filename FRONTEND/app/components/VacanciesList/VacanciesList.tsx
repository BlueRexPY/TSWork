import { IVacancy } from "@/api/models/IVacancy";
import { Alert } from "antd";
import React from "react";
import VacancyItem from "./VacancyItem";

type Props = {
  vacancies: IVacancy[];
};

const VacanciesList = ({ vacancies }: Props) => {
  return (
    <div className="vacancyList">
      {vacancies.length !== 0?vacancies.map((item, index) => {
        return <VacancyItem key={index} vacancy={item} />;
      }): <h2 className="margin">Sorry, there are no job offers</h2>}
    </div>
  );
};

export default VacanciesList;
