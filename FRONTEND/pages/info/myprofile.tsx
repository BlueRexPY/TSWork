import React, { useState } from "react";
import Layout from "@/layouts/MainLayout";
import { useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import SkeletonVacanciesList from "@/components/VacanciesList/SkeletonVacanciesList";
import VacanciesList from "@/components/VacanciesList/VacanciesList";
import { IVacancy } from "@/api/models/IVacancy";
import { VacaniesService } from "@/api/services/VacanciesService";

const MyProfile: NextPage = () => {
  const { auth, user } = useAppSelector((state) => state.authReducer);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [vacancies, setVacancies] = useState<IVacancy[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const newArr = await Promise.all(
        user.responses.map(async function (item) {
          const res = await VacaniesService.getOneById(item);
          return res.data;
        })
      );
      setVacancies(newArr);
    };

    if (!auth) {
      router.push("/auth/login");
    } else {
      fetch();
      setLoading(false);
    }
  }, []);

  const getContent = () => {
    if (loading) {
      return <SkeletonVacanciesList />;
    }
    return <VacanciesList vacancies={vacancies} />;
  };

  return (
    <Layout col={1} title="My Profile">
      <p>my response</p>
      {getContent()}
    </Layout>
  );
};

export default MyProfile;
