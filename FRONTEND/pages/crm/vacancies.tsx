import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Layout from "@/layouts/MainLayout";
import VacanciesLegendCrm from "@/components/crm/VacanciesLegendCrm";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { IVacancy } from "@/api/models/IVacancy";
import VacanciesCrmTable from "@/components/crm/VacanciesCrmTable";
import { VacanciesService } from "@/api/services/VacanciesService";
import AuthService from "@/api/services/AuthService";
import { authSlice } from "@/store/reducers/authSlice";
import AnimatedLogo from "@/components/utils/AnimatedLogo";

const Vacancies: NextPage = () => {
  const { user, auth } = useAppSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(true);
  const [vacancies, setVacancies] = useState<IVacancy[]>([]);
  const dispatch = useAppDispatch();
  const { updateAuth } = authSlice.actions;

  const fetch = async (responses: string[]) => {
    const newArr = await Promise.all(
      responses.map(async function (item) {
        const res = await VacanciesService.getOneById(item);
        return res.data;
      })
    );
    setVacancies(newArr);
  };

  useEffect(() => {
    setLoading(true);
    if (auth) {
      AuthService.getByEmail(user.email).then((res) => {
        dispatch(updateAuth(res.data));
        fetch(res.data.vacancies).then(() => setLoading(false));
      });
    }
  }, [auth]);

  return (
    <Layout col={1} full={true} title="CRM" needAuth={true}>
      {loading ? (
        <AnimatedLogo />
      ) : (
        <>
          <VacanciesLegendCrm />
          <VacanciesCrmTable vacancies={vacancies} />
        </>
      )}
    </Layout>
  );
};

export default Vacancies;
