import React, { useEffect, useState } from "react";
import { NextPage } from 'next';
import Layout from "@/layouts/MainLayout";
import { Button, Form, Input, Select } from 'antd';
import { useRouter } from "next/router";
import { UseInput } from "@/hooks/useInput";
import FileUploaderPhoto from '@/components/crm/FileUploaderPhoto';
import { useAppSelector } from "@/hooks/redux";
import { LVL_LIST, TECH_LIST } from "@/utils/consts";
import Checkbox from "antd/lib/checkbox/Checkbox";
import TextArea from "antd/lib/input/TextArea";

const Create:NextPage = () => {
  const { auth } = useAppSelector((state) => state.authReducer);  
  const router = useRouter();
  const [photoLogo, setPhotoLogo] = useState([{ originFileObj: "" }]);
  const companyName = UseInput("");
  const companyAddress = UseInput("");
  const [companySize, setCompanySize] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const positionName = UseInput("");
  const [employmentType, setEmploymentType] = useState("")
  const [mainTechnolagy, setMainTechnolagy] = useState("")
  const applyLink = UseInput("");
  const [TSWCheckBox, setTSWCheckBox] = useState(false)
  const [jobDescription, setJobDescription] = useState("")

  useEffect(() => {
    if (!auth) {
      router.push("/auth/login");
    } 
  }, [])
  const createVacancy = () =>{
  }

  return (
    <Layout col={1} full={true} title="Create Vacancy">
      <div className="centerBigForm">
        <Form
          className="container"
          id="login"
          initialValues={{ remember: true }}
          onFinish={createVacancy}
          autoComplete="off"
          role="form"
        >
         <FileUploaderPhoto maxCount={1} setFile={setPhotoLogo} />
          <br />
          <Input placeholder="company name" className="containerItem" {...companyName} />
          <Input placeholder="company address" className="containerItem" {...companyAddress} />
          <Select
            className="containerItem"
            showSearch
            placeholder="company size"
            onChange={(e)=>setCompanySize(e)}
          >
            <Select.Option key={10}>10</Select.Option>
            <Select.Option key={50}>50</Select.Option>
            <Select.Option key={100}>100</Select.Option>
            <Select.Option key={1000}>1000</Select.Option>
          </Select>
          <Select
            className="containerItem"
            showSearch
            placeholder="experience level"
            onChange={(e)=>setExperienceLevel(e)}
          >
            {LVL_LIST.map((i) => (
              <Select.Option key={i}>{i}</Select.Option>
            ))}
          </Select>
          <Input placeholder="position name" className="containerItem" {...positionName} />
          <Select
            className="containerItem"
            showSearch
            placeholder="employment type"
            onChange={(e)=>setEmploymentType(e)}
          >
            <Select.Option key={"B2B"}>{"B2B"}</Select.Option>
            <Select.Option key={"Permanent"}>{"Permanent"}</Select.Option>
            <Select.Option key={"Mandate contact"}>{"Mandate contact"}</Select.Option>
          </Select>
          <div className="containerItem row">
            <Input prefix="$" placeholder="min" className="containerItemBigSide"/>
            <p>{"-"}</p>
            <Input prefix="$" placeholder="max" className="containerItemBigSide"/>
          </div>
          <Select
            className="containerItem"
            showSearch
            placeholder="main technolagy"
            onChange={(e)=>setMainTechnolagy(e)}
          >
            {TECH_LIST.map((i) => (
              <Select.Option key={i}>{i}</Select.Option>
            ))}
          </Select>
          <Select
            className="containerItem"
            showSearch
            placeholder="main technolagy"
            onChange={(e)=>setMainTechnolagy(e)}
          >
            {TECH_LIST.filter(i => i!==mainTechnolagy).map((i) => (
              <Select.Option key={i}>{i}</Select.Option>
            ))}
          </Select>
          <TextArea placeholder="job description"  autoSize={{ minRows: 4, maxRows: 7}} className="containerItem jobDescriptionForm" onChange={e=>setJobDescription(e.target.value)} value={jobDescription}/>
          <Input placeholder="apply link" className="containerItem" {...applyLink} />
          <Checkbox onChange={(e)=>setTSWCheckBox(e.target.value)} className="containerItem">tswork take 5% of salary</Checkbox>
          <Button type="primary" className="containerItem" onClick={createVacancy}>
            Create Vacancy
          </Button>
        </Form>
      </div>
    </Layout>
  )
};

export default Create;
