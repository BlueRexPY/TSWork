import { IVacancy } from "@/api/models/IVacancy";
import { VacanciesService } from "@/api/services/VacanciesService";
import SkeletonVacanciesList from "@/components/vacancy/SkeletonVacanciesList";
import VacanciesList from "@/components/vacancy/VacanciesList";
import VacancyInfo from "@/components/vacancy/VacancyInfo";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { vacanciesSlice } from "@/store/reducers/vacanciesSlice";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import Layout from "@/layouts/MainLayout";
import { navSlice } from "@/store/reducers/navSlice";
import ToGetStart from "@/components/utils/ToGetStart";

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

const VacancySelected: NextPage<vacancy> = (SearchVacancy: vacancy) => {
  const dispatch = useAppDispatch();
  const { skill, lvl } = useAppSelector((state) => state.navReducer);
  const { setActive } = navSlice.actions;
  const { vacancies } = useAppSelector((state) => state.vacancyReducer);
  const { setVacancies } = vacanciesSlice.actions;
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(false);
  const [filterVacancies, setFilterVacancies] = useState<IVacancy[]>([]);

  const filterList = (list: IVacancy[]) => {
    if (skill !== "") {
      list = list.filter(
        (i) => i.mainTechnology === skill || i.techStack.includes(skill)
      );
    }
    if (lvl !== "All") {
      list = list.filter((i) => i.experienceLevel === lvl);
    }
    setLoading(false);
    return list;
  };

  useEffect(() => {
    if (SearchVacancy.id !== "search") {
      dispatch(setActive(true));
      setSelected(true);
    } else {
      dispatch(setActive(false));
      setSelected(false);
    }
  }, [SearchVacancy.id]);

  useEffect(() => {
    if (vacancies.length === 0) {
      VacanciesService.getVacancies().then((res) => {
        dispatch(setVacancies(res.data));
        setFilterVacancies(filterList(res.data));
      });
    } else {
      setFilterVacancies(filterList(vacancies));
    }
  }, [lvl, skill]);

  return (
    <Layout col={2} full={true} title={skill === "" ? "Search" : skill}>
      {loading ? (
        <SkeletonVacanciesList />
      ) : (
        <VacanciesList vacancies={filterVacancies} />
      )}
      {selected ? <VacancyInfo id={SearchVacancy.id} /> : <ToGetStart />}
    </Layout>
  );
};

export default VacancySelected;
