import React, { useState } from "react";
import Link from "next/link";
import { UseInput } from "../../hooks/useInput";
import { Form, Input, Button, notification } from "antd";
import styles from "./Auth.module.css";
import {
  loginValid,
  loginValidValue,
  passwordValidValue,
  registerValid,
} from "./valids";
import AuthService from "../../api/services/auth/AuthService";
import { requestsState } from "../../store/atoms/trend/requestsState";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { auth } from "../../store/atoms/auth/auth";
import Cookies from "js-cookie";
import { user } from "../../store/atoms/auth/user";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const login = UseInput("");
  const password = UseInput("");
  const repeatPassword = UseInput("");
  const [requests, setRequests] = useRecoilState(requestsState);
  const [authUser, setAuthUser] = useRecoilState(auth);
  const [userData, setUserData] = useRecoilState(user);
  const router = useRouter();

  const onSuccess = () => {
    notification.success({
      message: "Success login",
    });
  };

  const onError = () => {
    notification.error({
      message: "Error",
      description: "incorrect data, passwords are different",
    });
  };

  const onErrorReq = () => {
    notification.error({
      message: "Error",
      description: "the password or login is already taken",
    });
  };

  const onFinish = () => {
    setLoading(true);
    if (registerValid(login.value, password.value, repeatPassword.value)) {
      AuthService.registration(login.value, password.value)
        .then((res) => {
          if (res.data) {
            Cookies.set("token", res.data.token);
            setRequests(res.data.user.requests);
            setUserData(res.data.user.login);
            setLoading(false);
            setAuthUser(true);
            router.push("/");
            onSuccess();
          }
        })
        .catch(onErrorReq);
    } else {
      onError();
    }
    setLoading(false);
  };

  return (
    <Form
      autoComplete="off"
      layout="vertical"
      name="Login"
      onFinish={onFinish}
      className={styles.container}
    >
      <Form.Item
        className={styles.formItem}
        name="username"
        label="Login"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
          {
            message: "invalid login 3-16",
            validator: (_, value) => {
              if (loginValidValue(value)) {
                return Promise.resolve();
              } else {
                return Promise.reject("invalid login 3-16");
              }
            },
          },
        ]}
      >
        <Input {...login} />
      </Form.Item>
      <Form.Item
        label="Password"
        className={styles.formItem}
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          {
            message: "invalid password 8-32",
            validator: (_, value) => {
              if (passwordValidValue(value)) {
                return Promise.resolve();
              } else {
                return Promise.reject("invalid password 8-32");
              }
            },
          },
        ]}
      >
        <Input.Password {...password} />
      </Form.Item>
      <Form.Item
        label="Repeat password"
        className={styles.formItem}
        name="repeatPassword"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          {
            message: "incorrect data, passwords are different",
            validator: (_, value) => {
              if (value === password.value) {
                return Promise.resolve();
              } else {
                return Promise.reject(
                  "incorrect data, passwords are different"
                );
              }
            },
          },
        ]}
      >
        <Input.Password {...repeatPassword} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
      <Form.Item>
        <Link href="/auth/login">
          <Button type="link">or login</Button>
        </Link>
      </Form.Item>
    </Form>
  );
};

export default Register;
