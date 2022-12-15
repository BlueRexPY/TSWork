import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import AuthService from "@/api/services/AuthService";
import { IVacancy } from "@/api/models/IVacancy";
import { VacanciesService } from "@/api/services/VacanciesService";
import { Button, Form, Input, message } from "antd";
import { MaskedInput } from "antd-mask-input";
import { isGithub } from "@/utils/valid";
import { isNumber } from "@/utils/valid";
import { authSlice } from "@/store/reducers/authSlice";
import { UseInput } from "@/hooks/useInput";
import Layout from "@/layouts/MainLayout";
import SkeletonVacanciesList from "@/components/vacancy/SkeletonVacanciesList";
import VacanciesList from "@/components/vacancy/VacanciesList";
import FileUploader from "@/components/utils/FileUploader";
import ThemeSwitcher from "@/components/utils/ThemeSwitcher";

const MyProfile: NextPage = () => {
  const { auth, user } = useAppSelector((state) => state.authReducer);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [vacancies, setVacancies] = useState<IVacancy[]>([]);
  const dispatch = useAppDispatch();
  const { updateAuth } = authSlice.actions;

  const name = UseInput("");
  const surname = UseInput("");
  const number = UseInput("");
  const github = UseInput("");
  const [cv, setCv] = useState([{ originFileObj: "" }]);

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
        fetch(res.data.responses).then(() => setLoading(false));
      });
    } else {
      setLoading(false)
    }
  }, [auth]);

  const change = () => {
    setLoadingButton(true);
    let newData = {
      email: user.email,
      name: name.value.length > 3 ? name.value : user.name,
      surname: surname.value.length > 3 ? surname.value : user.surname,
      github: isGithub(github.value) ? github.value : user.github,
      number: isNumber(number.value) ? number.value : user.number,
    };
    if (cv[0].originFileObj === "") {
      AuthService.update(
        newData.name,
        newData.surname,
        newData.email,
        newData.github,
        newData.number
      ).then((res) => {
        dispatch(updateAuth(res.data));
        message.success("successful update");
        router.push("/");
      });
    } else {
      AuthService.updateCV(
        newData.name,
        newData.surname,
        newData.email,
        newData.github,
        newData.number,
        cv[0]
      ).then((res) => {
        dispatch(updateAuth(res.data));
        message.success("successful update");
        router.push("/");
      });
    }
    setLoadingButton(false);
  };

  return (
    <Layout col={2} title="My Profile" myProfile={user.roles} needAuth={true}>
      <div className="center">
          <Form
            className="container change"
            name="change"
            id="login"
            initialValues={{ remember: true }}
            autoComplete="off"
            role="form"
          >
            <Input placeholder={user.name} className="containerItem" {...name} />
            <Input
              placeholder={user.surname}
              className="containerItem"
              {...surname}
            />
            <Input
              placeholder={user.github}
              className="containerItem"
              {...github}
            />
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
            <Button
              type="primary"
              className="containerItem"
              onClick={change}
              disabled={loadingButton}
              loading={loadingButton}
            >
              Update
            </Button>
          </Form>
        <div className="container" style={{margin: "50px"}}>
          <ThemeSwitcher />
        </div>
      </div>

      <div className="h100">
        <h3 className="centerLine">
          my response{loading ? `` : ` - ${vacancies.length}`}
        </h3>
        {loading ? (
          <SkeletonVacanciesList display={true} />
        ) : (
          <VacanciesList display={true} vacancies={vacancies} />
        )}
      </div>
    </Layout>
  );
};

export default MyProfile;
