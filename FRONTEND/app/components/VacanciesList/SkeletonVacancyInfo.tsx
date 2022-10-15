import { useAppSelector } from "@/hooks/redux";
import { Skeleton } from "antd";
import React from "react";

const SkeletonVacancyInfo: React.FC = () => {
  const { active } = useAppSelector((state) => state.navReducer);
  return (
    <div className={`vacancyPage ${!active ? "mobileVacancy" : ""}`}>
      <div className="vacancyInfo">
        <div className="header padding20">
          <Skeleton active />
        </div>
        <main role="skeleton">
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </main>
      </div>
    </div>
  );
};

export default SkeletonVacancyInfo;
