import React, { useState } from "react";
import { NextPage } from "next";
import Layout from "@/layouts/MainLayout";
import { Button, Form, Input, InputNumber, message, Select } from "antd";
import { useRouter } from "next/router";
import { UseInput } from "@/hooks/useInput";
import FileUploaderPhoto from "@/components/crm/FileUploaderPhoto";
import { LVL_LIST, TECH_LIST } from "@/utils/consts";
import Checkbox from "antd/lib/checkbox/Checkbox";
import TextArea from "antd/lib/input/TextArea";
import { isDefaultValid } from "@/utils/valid";
import { VacanciesService } from "@/api/services/VacanciesService";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { vacanciesSlice } from "@/store/reducers/vacanciesSlice";

const Create: NextPage = () => {
  const { setVacancies } = vacanciesSlice.actions;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [logo, setLogo] = useState([{ originFileObj: "" }]);
  const companyName = UseInput("");
  const companyAddress = UseInput("");
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0);
  const [companySize, setCompanySize] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const positionName = UseInput("");
  const [employmentType, setEmploymentType] = useState("");
  const [mainTechnology, setMainTechnology] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const applyLink = UseInput("");
  const [TSWCheckBox, setTSWCheckBox] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [companyType, setCompanyType] = useState("");
  const { user } = useAppSelector((state) => state.authReducer);

  const createVacancy = () => {
    setLoading(true);
    if (
      logo[0]?.originFileObj&&
      isDefaultValid(companyName.value)&&
      isDefaultValid(companyAddress.value)&&
      companyType&&
      companySize&&
      workLocation&&
      experienceLevel&&
      isDefaultValid(positionName.value)&&
      employmentType&&
      minSalary>99&&
      maxSalary>99&&
      mainTechnology&&
      techStack.length>0&&
      jobDescription.length>3&&jobDescription.length<999&&
      TSWCheckBox
    ) {
      const clearTech =  [...techStack].filter(i => i !== mainTechnology)
      VacanciesService.postVacancy(
        {
          author: user.email,
          companyName: companyName.value,
          companyAddress: companyAddress.value,
          companySize,
          companyType,
          experienceLevel,
          positionName: positionName.value,
          employmentType,
          minSalary,
          maxSalary,
          mainTechnology,
          techStack: [mainTechnology,...clearTech],
          jobDescription,
          applyLink: applyLink.value,
          workLocation,
        },
        logo[0]
      )
        .then((res) => {if(res){message.success("Success post");VacanciesService.getVacancies().then((res) => {dispatch(setVacancies(res.data))});router.push("/crm/vacancies/")}})
        .finally(()=>setLoading(false))
        .catch((e) => message.success("error"));
    }else {
      message.error("Invalid data");
      setLoading(false)
    }
  };

  return (
    <Layout col={1} title="Create Vacancy" needAuth={true}>
      <div className="centerBigForm">
        <Form
          className="container"
          id="login"
          initialValues={{ remember: true }}
          onFinish={createVacancy}
          autoComplete="off"
          role="form"
        >
          <FileUploaderPhoto maxCount={1} setFile={setLogo} />
          <br />
          <Input
            placeholder="company name"
            className="containerItem"
            {...companyName}
          />
          <Input
            placeholder="company address"
            className="containerItem"
            {...companyAddress}
          />
          <Select
            className="containerItem"
            showSearch
            placeholder="company type"
            onChange={(e) => setCompanyType(e)}
          >
            <Select.Option key={"Startup"}>{"Startup"}</Select.Option>
            <Select.Option key={"Software House"}>
              {"Software House"}
            </Select.Option>
            <Select.Option key={"E-commerce"}>{"E-commerce"}</Select.Option>
            <Select.Option key={"Corporation"}>{"Corporation"}</Select.Option>
            <Select.Option key={"Other"}>{"Other"}</Select.Option>
          </Select>
          <Select
            className="containerItem"
            showSearch
            placeholder="company size"
            onChange={(e) => setCompanySize(e)}
          >
            <Select.Option key={10}>10</Select.Option>
            <Select.Option key={50}>50</Select.Option>
            <Select.Option key={100}>100</Select.Option>
            <Select.Option key={1000}>1000</Select.Option>
          </Select>
          <Select
            className="containerItem"
            showSearch
            placeholder="work location"
            onChange={(e) => setWorkLocation(e)}
          >
            <Select.Option key={"Office"}>{"Office"}</Select.Option>
            <Select.Option key={"Partly remote"}>
              {"Partly remote"}
            </Select.Option>
            <Select.Option key={"Fully remote"}>{"Fully remote"}</Select.Option>
          </Select>
          <Select
            className="containerItem"
            showSearch
            placeholder="experience level"
            onChange={(e) => setExperienceLevel(e)}
          >
            {LVL_LIST.map((i) => (
              <Select.Option key={i}>{i}</Select.Option>
            ))}
          </Select>
          <Input
            placeholder="position name"
            className="containerItem"
            {...positionName}
          />
          <Select
            className="containerItem"
            showSearch
            placeholder="employment type"
            onChange={(e) => setEmploymentType(e)}
          >
            <Select.Option key={"B2B"}>{"B2B"}</Select.Option>
            <Select.Option key={"Permanent"}>{"Permanent"}</Select.Option>
            <Select.Option key={"Mandate contact"}>
              {"Mandate contact"}
            </Select.Option>
          </Select>
          <div className="containerItem row">
            <InputNumber
              prefix="$"
              placeholder="min"
              min={100}
              max={100000}
              className="containerItemBigSide"
              onChange={(e)=>setMinSalary(e)}
            />
            <p>{"-"}</p>
            <InputNumber
              prefix="$"
              placeholder="max"
              min={100}
              max={100000}
              onChange={(e)=>setMaxSalary(e)}
              className="containerItemBigSide"
            />
          </div>
          <Select
            className="containerItem"
            showSearch
            placeholder="main technology"
            onChange={(e) => setMainTechnology(e)}
          >
            {TECH_LIST.map((i) => (
              <Select.Option key={i}>{i}</Select.Option>
            ))}
          </Select>
          <Select
            className="containerItem"
            showSearch
            mode="multiple"
            maxTagCount={5}
            placeholder="tech stack"
            onChange={(e) => setTechStack(e)}
          >
            {TECH_LIST.filter((i) => i !== mainTechnology).map((i) => (
              <Select.Option key={i}>{i}</Select.Option>
            ))}
          </Select>
          <TextArea
            placeholder="job description"
            autoSize={{ minRows: 4, maxRows: 7 }}
            className="containerItem jobDescriptionForm"
            onChange={(e) => setJobDescription(e.target.value)}
            value={jobDescription}
          />
          <Input
            placeholder="apply link (optional)"
            className="containerItem"
            {...applyLink}
          />
          <Checkbox
            onChange={(e) => setTSWCheckBox(e.target.value)}
            className="containerItem"
          >
            tswork take 5% of salary
          </Checkbox>
          <Button
            type="primary"
            className="containerItem"
            onClick={createVacancy}
            loading={loading}
          >
            Create Vacancy
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default Create;
