import { IVacancy } from "@/api/models/IVacancy";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  vacancy: IVacancy;
};

const VacancyItem = ({ vacancy }: Props) => {
  return (
    <Link href={`/${vacancy._id}`}>
      <div className="vacancyItem">
      <div className="vacancyItemLeftSide">
        <Image
          src={vacancy.logo}
          loader={() => vacancy.logo}
          width={50}
          height={50}
          alt="logo"
          draggable={false}
        />
        <div className="col vacancyItemSideLeft">
          <h2 className="VacancyTitle">{vacancy.postionName}</h2>
          <h3 className="VacancyUtils">
            {vacancy.companyName} - {vacancy.experienceLevel}
          </h3>
        </div>
      </div>

      <div className="col vacancyItemSideRight">
        <h2 className="VacancyTitleLvl">
          {vacancy.maxSalary === vacancy.minSalary
            ? `${vacancy.minSalary}-${vacancy.maxSalary}`
            : `${vacancy.maxSalary}`}
          $
        </h2>
        <h3 className="VacancyUtils">{vacancy.mainTechnology}</h3>
      </div>
    </div>
    </Link>
  );
};

export default VacancyItem;
