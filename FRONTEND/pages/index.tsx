import Layout from "layouts/MainLayout";
import type { NextPage } from "next";
import { useAppSelector, useAppDispatch } from "../app/hooks/redux";
import { useState, useEffect, useLayoutEffect } from 'react';
import ToGetStart from "@/components/utils/ToGetStart";
import SkeletonVacaniesList from "../app/components/VacanciesList/SkeletonVacanciesList";
import VacanciesList from "@/components/VacanciesList/VacanciesList";
import VacaniesService from "@/api/services/VacanciesService";
import { vacanciesSlice } from "@/store/reducers/vacanciesSlice";


const Home: NextPage = () => {
  const { vacancies } = useAppSelector((state) => state.vacancyReducer);
  const {setVacancies} = vacanciesSlice.actions
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  VacaniesService.getVacancies().then((res) => dispatch(setVacancies(res.data)))

  useLayoutEffect(() => {
    setLoading(false)
  }, [])

  return (
    <Layout col={2} full={true}>
      {loading?<SkeletonVacaniesList/>:<VacanciesList vacancies={vacancies}/>}
      <ToGetStart />
    </Layout>
  );
};

export default Home;
