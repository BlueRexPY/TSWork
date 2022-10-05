import React, { useState } from "react";
import Layout from "@/layouts/MainLayout";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import SkeletonVacanciesList from "@/components/VacanciesList/SkeletonVacanciesList";
import VacanciesList from "@/components/VacanciesList/VacanciesList";
import { IVacancy } from "@/api/models/IVacancy";
import { VacaniesService } from "@/api/services/VacanciesService";
import { Button, Form, Input, message } from "antd";
import { UseInput } from "@/hooks/useInput";
import { MaskedInput } from "antd-mask-input";
import FileUploader from "@/components/utils/FileUploader";
import { isGithub } from "@/utils/valid";
import AuthService from "@/api/services/AuthService";
import {authSlice} from "@/store/reducers/authSlice";
import { isNumber } from '../../app/utils/valid';

const MyProfile: NextPage = () => {
  const { auth, user } = useAppSelector((state) => state.authReducer);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [vacancies, setVacancies] = useState<IVacancy[]>([]);
  const dispatch = useAppDispatch();
  const { updateAuth } = authSlice.actions;

  const name = UseInput("");
  const surename = UseInput("");
  const number = UseInput("");
  const github = UseInput("");
  const [cv, setCv] = useState([{ originFileObj: "" }]);
  
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

  const change = () =>{
    setLoadingButton(true)
    let newData = {
      email: user.email,
      name: name.value.length>3?name.value:user.name,
      surename: surename.value.length>3?surename.value:user.surename,
      github: isGithub(github.value)?github.value:user.github,
      number: isNumber(number.value)? number.value:user.number
    }

    if(cv[0].originFileObj.length===0){
      AuthService.update(
        newData.name,
        newData.surename,
        newData.email,
        newData.github,
        newData.number,
      ).then((res)=>{dispatch(updateAuth(res.data));message.success("successful update");router.push("/");})
    }else{
      AuthService.updateCV(
        newData.name,
        newData.surename,
        newData.email,
        newData.github,
        newData.number,
        cv[0]
      ).then((res)=>{dispatch(updateAuth(res.data));message.success("successful update");router.push("/");})
    }
    setLoadingButton(false)
  }

  return (
    <Layout col={2} title="My Profile">
       <div className="center margin50">
        <Form
          className="container change"
          name="change"
          id="login"
          initialValues={{ remember: true }}
          onFinish={change}
          autoComplete="off"
          role="form"
        >
          <Input placeholder={user.name} className="containerItem" {...name} />
          <Input placeholder={user.surename} className="containerItem" {...surename} />
          <Input placeholder={user.github} className="containerItem" {...github} />
          <MaskedInput
            className="containerItem"
            {...number}
            mask={"+00(00)0000-0000"}
            maskOptions={{
              dispatch: function (appended, dynamicMasked) {
                const isCellPhone = dynamicMasked.unmaskedValue[2] === "9";
                return dynamicMasked.compiledMasks[isCellPhone ? 0 : 1];
              },
            }}
          />
          <FileUploader maxCount={1} setFile={setCv} />
          <br />
          <Button type="primary" className="containerItem" onClick={change} disabled={loadingButton} loading={loadingButton}>
            Change
          </Button>
        </Form>
      </div>
      <div>
        <h3 className="centerLine">my response{loading?``:` - ${vacancies.length}`}</h3>
        {loading?<SkeletonVacanciesList />:<VacanciesList vacancies={vacancies}/>}
      </div>
    </Layout>
  );
};

export default MyProfile;
