import React from "react";
import Layout from "layouts/MainLayout";
import { Button, Form, Input, message } from 'antd';
import Link from "next/link";
import AuthService from "@/api/services/AuthService";
import { isEmailValid, isPasswordVaild } from "@/utils/valid";
import { UseInput } from "@/hooks/useInput";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { authSlice } from "@/store/reducers/authSlice";
import { useRouter } from "next/router";

function register() {
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.authReducer);
  const { loginAuth } = authSlice.actions;
  const dispatch = useAppDispatch();

  const email = UseInput("");
  const password = UseInput("");

  const login = () => {
    if (isPasswordVaild(password.value) && isEmailValid(email.value)) {
      AuthService.login(email.value, password.value)
        .then((res) =>
          !res.data.user.active
            ? dispatch(loginAuth(res.data))
            : message.error(
                "your account is not activated, please check your email"
              )
        )
        .then(() => {
          message.success("successful login");
          router.push("/");
        })
        .catch(() => {
          message.error("incorrect password");
        });
    } else {
      message.error("enter correct email or password");
    }
  };

  return (
    <Layout col={1} title="Login">
      <div className="center">
        <Form
          className="container"
          name="login"
          id="login"
          initialValues={{ remember: true }}
          onFinish={login}
          autoComplete="off"
        >
          <Input placeholder="email" className="containerItem" {...email} />
          <Input.Password
            placeholder="password"
            className="containerItem"
            maxLength={32}
            minLength={8}
            {...password}
          />
          <Button type="primary" className="containerItem" onClick={login}>
            Register
          </Button>

          <Link href="/auth/login">
            <Button type="link" className="containerItem" size="small">
              or login
            </Button>
          </Link>
        </Form>
      </div>
    </Layout>
  );
}

export default register;
