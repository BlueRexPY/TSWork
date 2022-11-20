import { VacanciesService } from "@/api/services/VacanciesService";
import share from "@/assets/img/share.png";
import back from "@/assets/img/back.png";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IVacancy } from "@/api/models/IVacancy";
import SkeletonVacancyInfo from "./SkeletonVacancyInfo";
import { Alert, Button, message } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/router";
import Image from "next/image";
import { navSlice } from "@/store/reducers/navSlice";

type Props = {
  id: string;
};

const VacancyInfo: React.FC<Props> = ({ id }: Props) => {
  const [vacancy, setVacancy] = useState<IVacancy>();
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [date, setDate] = useState("");
  const { auth, user } = useAppSelector((state) => state.authReducer);
  const { active } = useAppSelector((state) => state.navReducer);
  const { setActive } = navSlice.actions;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleApply = () => {
    if (auth) {
      setDisabledButton(true);
      setLoadingButton(true);
      VacanciesService.response(user.email, id).then(() => {
        message.success("Your resume has been sent");
        dispatch(setActive(false));
      });
      VacanciesService.responseUser(user.email, id).then(() =>
        setLoadingButton(false)
      );
      if (vacancy?.applyLink !== "") {
        window.open(vacancy?.applyLink);
      }
    } else {
      router.push("/auth/login");
    }
  };

  const onLoad = (data: IVacancy) => {
    setDisabledButton(false);
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

  const closeVacancy = () => dispatch(setActive(false));
  const shareVacancy = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success("link in clipboard");
  };

  useEffect(() => {
    setLoading(true);
    if (id !== "search") {
      VacanciesService.getOneById(id)
        .then((res) => onLoad(res.data))
        .catch((e) => console.log(e));
    }
  }, [id]);

  if (loading) {
    return <SkeletonVacancyInfo />;
  }
  return (
    <div
      id="vacancyPage"
      className={`vacancyPage ${!active ? "mobileVacancy" : ""}`}
      role="vacancyInfo"
    >
      <div className="additionalButtons">
        <div className="backButton" onClick={() => closeVacancy()}>
          <Image
            src={back}
            width={30}
            height={30}
            alt="back"
            draggable={false}
          />
        </div>
        <div className="backButton" onClick={() => shareVacancy()}>
          <Image
            src={share}
            width={30}
            height={30}
            alt="back"
            draggable={false}
          />
        </div>
      </div>
      <div className="vacancyInfo">
        <div id="header" className="header">
          <Image
            src={vacancy ? vacancy?.logo : ""}
            loader={() => (vacancy ? vacancy?.logo : "")}
            width={75}
            height={75}
            alt="logo"
            draggable={false}
          />
          <div className="headerInfo">
            <h2>{vacancy?.positionName}</h2>
            <p>
              {vacancy?.companyName} - {vacancy?.workLocation}
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
          {!vacancy?.show ? (
            <Alert message="VACANCY REMOVED" type="error" />
          ) : (
            <></>
          )}
          <div>
            <h3>
              <b>Tech skills:</b>
            </h3>
            <div className="techSkillsList">
              {vacancy?.techStack?.map((e, i) => (
                <p id={`item-${i}`} key={i}>
                  {e}
                </p>
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
              <b>Company type:</b> {vacancy?.companyType}
            </h3>
          </div>
          <div>
            <h3>
              <b>company address:</b> {vacancy?.companyAddress}
            </h3>
          </div>
          <div>
            <h3>
              <b>Placement date:</b> {date}
            </h3>
          </div>
          <div id="description">
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
        {!vacancy?.show ? (
          <Button size="large" type="text" disabled={true}>
            VACANCY REMOVED
          </Button>
        ) : (
          <Button
            size="large"
            type="text"
            disabled={disabledButton}
            loading={loadingButton}
            onClick={() => handleApply()}
          >
            {vacancy?.applyLink === "" ? "One click Apply" : "Apply"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default VacancyInfo;
