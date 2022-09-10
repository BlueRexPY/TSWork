import Layout from "layouts/MainLayout";
import type { NextPage } from "next";
import { useAppSelector, useAppDispatch } from "../app/hooks/redux";
import { useState, useLayoutEffect, useEffect } from 'react';
import ToGetStart from "@/components/utils/ToGetStart";
import SkeletonVacaniesList from "../app/components/VacanciesList/SkeletonVacanciesList";
import VacanciesList from "@/components/VacanciesList/VacanciesList";
import { vacanciesSlice } from "@/store/reducers/vacanciesSlice";
import { IVacancy } from "@/api/models/IVacancy";
import VacaniesService from "@/api/services/VacanciesService";


const Home: NextPage = () => {
  const { vacancies } = useAppSelector((state) => state.vacancyReducer);
  const {setVacancies} =vacanciesSlice.actions
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<IVacancy[]>([])
  useEffect(() => {
    VacaniesService.getVacancies().then((res) => dispatch(setVacancies(res.data)))
    setLoading(false)
  }, [])


  const getContent = () => {
    if (loading) {
      return <SkeletonVacaniesList />;
    }
    return <VacanciesList vacancies={vacancies} />;
  };

  return (
    <Layout col={2} full={true}>
      {getContent()}
      <ToGetStart />
    </Layout>
  );
};

export default Home;
