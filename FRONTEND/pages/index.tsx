import Layout from "layouts/MainLayout";
import type { NextPage } from "next";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "../app/hooks/redux";
import serchImg from "@/assets/img/serch.png";
import SkeltonItem from '../app/components/ListVacancies/SkeltonItem';

const Home: NextPage = () => {
  const { vacancies } = useAppSelector((state) => state.vacancyReducer);
  const {} = useAppSelector((state) => state.vacancyReducer);
  const dispatch = useAppDispatch();

  return (
    <Layout col={2} full={true}>
      <div className="vacancyList">
        <SkeltonItem/>
        <SkeltonItem/>
        <SkeltonItem/>
        <SkeltonItem/>
        <SkeltonItem/>
        <SkeltonItem/>
      </div>
      <div className="indexToGetStart">
        <Image
          src={serchImg}
          width={300}
          height={300}
          alt="To get started, choose one of the offers"
          draggable={false}
        ></Image>
        <h1>To get started,<br></br>
choose one of the offers</h1>
      </div>
    </Layout>
  );
};

export default Home;
