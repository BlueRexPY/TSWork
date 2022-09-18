import VacaniesService from "@/api/services/VacanciesService";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IVacancy } from "@/api/models/IVacancy";
import SkeletonVacancyInfo from "./SkeletonVacancyInfo";
import { Button, message } from "antd";
import { useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/router";
import Image from "next/image";

type Props = {
  id: string;
};

const VacancyInfo = ({ id }: Props) => {
  const [vacancy, setVacancy] = useState<IVacancy>();
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [date, setDate] = useState("");
  const { auth, user } = useAppSelector((state) => state.authReducer);
  const router = useRouter();

  const handleApply = () =>{
    if(auth){
      setLoadingButton(true)
      VacaniesService.response(user.email,id).then((res)=>{message.success("Your resume has been sent"); setLoadingButton(false)})
    }else{
      router.push("/auth/login")
    }
  }

  const onLoad = (data: IVacancy) => {
    setVacancy(data);
    setLoading(false);
    const vacancyDate = new Date(data.createdAt);
    setDate(
      `${vacancyDate.getDate() + 1 < 10 ? "0" : ""}${
        vacancyDate.getDate() + 1
      }.${vacancyDate.getMonth() + 1 < 10 ? "0" : ""}${
        vacancyDate.getMonth() + 1
      }`
    );
  };

  useEffect(() => {
    if (id !== "serch") {
      VacaniesService.getOneById(id)
        .then((res) => onLoad(res.data))
        .catch((e) => console.log(e));
    }
  }, [id]);

  if (loading) {
    return <SkeletonVacancyInfo />;
  }
  return (
    <div className="vacancyPage">
      <div className="vacancyInfo">
        <div className="header">
          <Image
            src={vacancy?vacancy?.logo:""}
            loader={() => vacancy?vacancy?.logo:""}
            width={100}
            height={100}
            alt="logo"
            draggable={false}
          />
          <div className="headerInfo">
            <h2>{vacancy?.postionName}</h2>
            <p>
              {vacancy?.workLocation} - {vacancy?.companyName}
            </p>
            <p>
              {vacancy?.maxSalary === vacancy?.minSalary
                ? `${vacancy?.maxSalary}`
                : `${vacancy?.minSalary}-${vacancy?.maxSalary}`}
              $/month - {vacancy?.employmentType}
            </p>
          </div>
        </div>
        <main>
          <div>
            <h3>
              <b>Tech skills:</b>
            </h3>
            <div className="techSkillsList">
              {vacancy?.techStack?.map((e) => (
                <p>{e}</p>
              ))}
            </div>
          </div>
          <div>
            <h3>
              <b>Company size:</b> {vacancy?.companySize}
            </h3>
          </div>
          <div>
            <h3>
              <b>Placement date:</b> {date}
            </h3>
            <p></p>
          </div>
          <div>
            <h3>
              <b>Description:</b>
            </h3>
            <p>{vacancy?.jobDescription}</p>
          </div>
        </main>
      </div>
      <div className="confirm">
        <p>
          {vacancy?.maxSalary === vacancy?.minSalary
            ? `${vacancy?.maxSalary}`
            : `${vacancy?.minSalary}-${vacancy?.maxSalary}`}
          $/month
        </p>
        <Button size="large" type="text" loading={loadingButton} onClick={()=>handleApply()}>Apply</Button>
      </div>
    </div>
  );
};

export default VacancyInfo;
