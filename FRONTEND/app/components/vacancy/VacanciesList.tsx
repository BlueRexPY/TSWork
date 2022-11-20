import { IVacancy } from "@/api/models/IVacancy";
import { useAppSelector } from "@/hooks/redux";
import React from "react";
import VacancyItem from "./VacancyItem";

type Props = {
  vacancies: IVacancy[];
  display?:boolean
};

const VacanciesList: React.FC<Props> = ({ vacancies,display = false }: Props) => {
  const { active } = useAppSelector((state) => state.navReducer);
  return (
    <div
      className={`vacancyList ${display?"":active ? "mobileList" : ""}`}
      role="vacancyList"
    >
      {vacancies.length !== 0 ? (
        vacancies
          ?.map((item, index) => {
            return <VacancyItem key={index} vacancy={item} />;
          })
          .reverse()
      ) : (
        <h2 className="margin">Sorry, there are no job offers</h2>
      )}
    </div>
  );
};

export default VacanciesList;
