import React, { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "@/layouts/MainLayout";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { VacanciesService } from "@/api/services/VacanciesService";
import AnimatedLogo from "@/components/utils/AnimatedLogo";
import { IVacancy } from "@/api/models/IVacancy";
import { IUser } from "@/api/models/IUser";
import AuthService from "@/api/services/AuthService";
import ResponsesCrmTable from "@/components/crm/ResponsesCrmTable";
import { Button, message, Modal, Popover, Progress } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { vacanciesSlice } from "@/store/reducers/vacanciesSlice";
import styles from '../../../styles/CMR.module.css'

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
  const { setVacancies } = vacanciesSlice.actions;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [vacancy, setVacancy] = useState<IVacancy>();
  const [responses, setResponses] = useState<IUser[]>([]);

  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: "Delete this vacancy?",
      icon: <ExclamationCircleOutlined />,
      content: "You will not be able to restore the vacancy",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        VacanciesService.delete(vacancy ? vacancy?._id : "")
          .then(() => {
            VacanciesService.getVacancies().then((res) => {
              dispatch(setVacancies(res.data));
            });
            message.success("vacancy removed");
          })
          .then(() => {
            router.push("/");
          });
      },
    });
  };

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
      {loading ? (
        <AnimatedLogo />
      ) : (
        <>
          <div className={styles.responsesInfo}>
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
            <div className={styles.responsesInfoText}>
              <h4>{`Position: ${vacancy ? vacancy.positionName : ""}`}</h4>
              <h4>{`Experience:  ${
                vacancy ? vacancy.experienceLevel : ""
              }`}</h4>
              <h4>{`Salary:  ${
                vacancy
                  ? vacancy.minSalary === vacancy.maxSalary
                    ? vacancy.minSalary
                    : vacancy.minSalary + "$-" + vacancy.maxSalary
                  : ""
              }$`}</h4>
              <h4>{`View/Responses: ${vacancy ? vacancy.view : ""} / ${
                vacancy ? vacancy.responses.length : ""
              }`}</h4>
              <Button onClick={showDeleteConfirm} type="default" size="small">
                Delete
              </Button>
            </div>
          </div>
          <ResponsesCrmTable responses={responses}></ResponsesCrmTable>
        </>
      )}
    </Layout>
  );
};

export default Response;
