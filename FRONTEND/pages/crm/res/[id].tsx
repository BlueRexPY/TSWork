import React, { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "@/layouts/MainLayout";
import { useAppSelector } from "@/hooks/redux";
import { VacanciesService } from "@/api/services/VacanciesService";
import AnimatedLogo from "@/components/utils/AnimatedLogo";
import { IVacancy } from "@/api/models/IVacancy";
import { IUser } from "@/api/models/IUser";
import AuthService from "@/api/services/AuthService";
import ResponsesCrmTable from "@/components/crm/ResponsesCrmTable";
import { Popover, Progress } from "antd";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  return {
    props: {
      id: id,
    },
  };
};

type vacancy = {
  id: string;
};

const Response: NextPage<vacancy> = (vacancyId: vacancy) => {
  const [loading, setLoading] = useState(true);
  const [vacancy, setVacancy] = useState<IVacancy>();
  const [responses, setResponses] = useState<IUser[]>([]);

  const fetch = async (responsesId: string[]) => {
    const newArr = await Promise.all(
      responsesId.map(async function (item) {
        const res = await AuthService.getByEmail(item);
        return res.data;
      })
    );
    setResponses(newArr);
  };

  useEffect(() => {
    if (vacancyId.id) {
      VacanciesService.getOneById(vacancyId.id)
        .then((res) => {
          setVacancy(res.data);
          fetch(res.data.responses).then(() => setLoading(false));
        })
        .catch((e) => console.log(e));
    }
  }, [vacancyId]);
  const getPercent = (view: number, responses: number) =>
    Math.round((responses / view) * 100);
  return (
    <Layout col={1} title="Responses" needAuth={true}>
      <div className="ResponsesInfo">
        <Popover
          content={
            <div>
              <p>{`${vacancy ? vacancy.responses.length : ""} / ${
                vacancy ? vacancy.view : ""
              } * 100% = ${getPercent(
                vacancy ? vacancy.view : 10,
                vacancy ? vacancy.responses.length : 12
              )}%`}</p>
            </div>
          }
          title="Conversion"
          trigger="hover"
        >
          <Progress
            type="circle"
            percent={getPercent(
              vacancy ? vacancy.view : 10,
              vacancy ? vacancy.responses.length : 12
            )}
          />
        </Popover>
        <div className="ResponsesInfoText">
          <h3>{`Position: ${vacancy ? vacancy.positionName : ""}`}</h3>
          <h3>{`Experience:  ${vacancy ? vacancy.experienceLevel : ""}`}</h3>
          <h3>{`Salary:  ${
            vacancy
              ? vacancy.minSalary === vacancy.maxSalary
                ? vacancy.minSalary
                : vacancy.minSalary + "$-" + vacancy.maxSalary
              : ""
          }$`}</h3>
          <h3>{`View/Responses: ${vacancy ? vacancy.view : ""} / ${
            vacancy ? vacancy.responses.length : ""
          }`}</h3>
        </div>
      </div>
      {loading ? (
        <AnimatedLogo />
      ) : (
        <ResponsesCrmTable responses={responses}></ResponsesCrmTable>
      )}
    </Layout>
  );
};

export default Response;
