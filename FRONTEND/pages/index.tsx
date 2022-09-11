import Layout from "layouts/MainLayout";
import type { NextPage } from "next";
import { useAppSelector, useAppDispatch } from "../app/hooks/redux";
import { useState, useEffect, useLayoutEffect } from 'react';
import ToGetStart from "@/components/utils/ToGetStart";
import SkeletonVacaniesList from "../app/components/VacanciesList/SkeletonVacanciesList";
import VacanciesList from "@/components/VacanciesList/VacanciesList";
import VacaniesService from "@/api/services/VacanciesService";
import { vacanciesSlice } from "@/store/reducers/vacanciesSlice";
import { IVacancy } from '../app/api/models/IVacancy';

const Home: NextPage = () => {
  const { skill, lvl } = useAppSelector((state) => state.navReducer);
  const dispatch = useAppDispatch();
  const { vacancies } = useAppSelector((state) => state.vacancyReducer);
  const {setVacancies} = vacanciesSlice.actions
  const [loading, setLoading] = useState(true);
  const [sortVacancies, setSortVacancies] = useState<IVacancy[]>([]);
  VacaniesService.getVacancies().then((res) => {if(res.status===200)dispatch(setVacancies(res.data));})

  useLayoutEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    let sortList = vacancies
    if(skill !== ""){
      sortList = (sortList.filter(i=> i.mainTechnology===skill || i.techStack.includes(skill)))
    }
    if(lvl !== "All"){
      sortList = (sortList.filter(i=> (i.experienceLevel===lvl)))
    }
    setSortVacancies(sortList)
  }, [skill,lvl])

  const getContent=()=>{
    if(loading){
    return <SkeletonVacaniesList/>
    }
    return <VacanciesList vacancies={sortVacancies}/>
  }
  

  return (
    <Layout col={2} full={true}>
      {getContent()}
      <ToGetStart />
    </Layout>
  );
};

export default Home;
