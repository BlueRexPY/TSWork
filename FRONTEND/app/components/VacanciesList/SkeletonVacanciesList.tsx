import { useAppSelector } from "@/hooks/redux";
import React from "react";
import SkeltonItem from "./SkeltonItem";

const SkeletonVacanciesList:React.FC = () => {
  const { active } = useAppSelector((state) => state.navReducer);
  return (
    <div className={`vacancyList ${!active ? "mobileList" : ""}`} role="skeleton">
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
