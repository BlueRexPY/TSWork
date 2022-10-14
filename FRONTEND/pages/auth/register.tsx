import React, { useState } from "react";
import Layout from "@/layouts/MainLayout";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import AuthService from "@/api/services/AuthService";
import { registerValid } from "@/utils/valid";
import { UseInput } from "@/hooks/useInput";
import { useRouter } from "next/router";
import { MaskedInput } from "antd-mask-input";
import FileUploader from "@/components/utils/FileUploader";
import { NextPage } from "next";
import Logo from "@/components/utils/Logo";

const Register: NextPage = () => {
  const router = useRouter();
  const name = UseInput("");
  const surname = UseInput("");
  const email = UseInput("");
  const number = UseInput("");
  const password = UseInput("");
  const passwordRepeat = UseInput("");
  const github = UseInput("");
  const [cv, setCv] = useState([{ originFileObj: "" }]);

  const [loading, setLoading] = useState(false);

  const register = () => {
    setLoading(true);
    if (password.value === passwordRepeat.value) {
      if (
        registerValid(
          name.value,
          surname.value,
          email.value,
          password.value,
          github.value,
          number.value
        )
      ) {
        AuthService.registration(
          name.value,
          surname.value,
          email.value,
          password.value,
          github.value,
          number.value,
          cv[0]
        )
          .then((res) => {
            if (res.data.user) {
              message.success("confirm email");
              router.push("/auth/login");
            } else {
              message.error("error");
            }
          })
          .catch(() => {
            message.error("error");
          });
      } else {
        message.error("incorrect data");
      }
    } else {
      message.error("Passwords don't match");
    }
    setLoading(false);
  };

  return (
    <Layout col={1} title="Register">
      <div className="centerBigForm">
        <Form
          className="container"
          name="login"
          id="login"
          initialValues={{ remember: true }}
          onFinish={register}
          autoComplete="off"
          role="form"
        >
          <Logo />
          <Input placeholder="name 4-32" className="containerItem" {...name} />
          <Input
            placeholder="surname 4-32"
            className="containerItem"
            {...surname}
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
          <Input placeholder="email" className="containerItem" {...email} />
          <Input.Password
            placeholder="password 8-32"
            className="containerItem"
            maxLength={32}
            minLength={8}
            {...password}
          />
          <Input.Password
            placeholder="confirm password"
            className="containerItem"
            maxLength={32}
            minLength={8}
            {...passwordRepeat}
          />
          <Input
            placeholder="github link"
            className="containerItem"
            {...github}
          />
          <FileUploader maxCount={1} setFile={setCv} />
          <br />
          <Button type="primary" className="containerItem" onClick={register}>
            Register
          </Button>
          <Link href="/auth/login">
            <Button
              type="link"
              className="containerItem"
              size="small"
              disabled={loading}
              loading={loading}
            >
              or login
            </Button>
          </Link>
        </Form>
      </div>
    </Layout>
  );
};

export default Register;
