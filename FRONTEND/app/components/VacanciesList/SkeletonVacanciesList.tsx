import { useAppSelector } from "@/hooks/redux";
import React from "react";
import SkeltonItem from "./SkeltonItem";

const SkeletonVacaniesList = () => {
  const { active } = useAppSelector((state) => state.navReducer);
  return (
    <div className={`vacancyList ${!active ? "mobileList" : ""}`}>
      <SkeltonItem />
      <SkeltonItem />
      <SkeltonItem />
      <SkeltonItem />
      <SkeltonItem />
      <SkeltonItem />
    </div>
  );
};

export default SkeletonVacaniesList;
