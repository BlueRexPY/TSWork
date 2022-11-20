import { useAppSelector } from "@/hooks/redux";
import React from "react";
import SkeltonItem from "./SkeltonItem";


type Props = {
  display?:boolean
};


const SkeletonVacanciesList: React.FC<Props> = ({display = false}) => {
  const { active } = useAppSelector((state) => state.navReducer);
  return (
    <div
      className={`vacancyList ${display?"":active ? "mobileList" : ""}`}
      role="skeleton"
    >
      <SkeltonItem />
      <SkeltonItem />
      <SkeltonItem />
      <SkeltonItem />
      <SkeltonItem />
      <SkeltonItem />
      <SkeltonItem />
    </div>
  );
};

export default SkeletonVacanciesList;
