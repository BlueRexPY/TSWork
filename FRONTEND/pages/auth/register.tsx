import React, { useState } from "react";
import Layout from "@/layouts/MainLayout";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import AuthService from "@/api/services/AuthService";
import { UseInput } from "@/hooks/useInput";
import { useRouter } from "next/router";
import { MaskedInput } from "antd-mask-input";
import FileUploader from "@/components/utils/FileUploader";
import { NextPage } from "next";
import Logo from "@/components/utils/Logo";
import { IValidRegister } from "@/utils/IValidRegister";
import { isEmailValid, isGithub, isPasswordValid } from "@/utils/valid";
import styles from "../../styles/Auth.module.css"

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
  const [error, setError] = useState(false);
  const [errorValid, setErrorValid] = useState<IValidRegister>({
    name: false,
    surname: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
    github: false,
    cv: false,
  });

  const valid = () => {
    if (password.value !== passwordRepeat.value) {
      message.error("Passwords don't match");
    }
    if (cv[0]?.originFileObj.length < 1) {
      message.error("incorrect cv data");
    }

    setErrorValid({
      name: name.value.length < 3,
      surname: surname.value.length < 3,
      phone: number.value.length !== 16,
      email: !isEmailValid(email.value),
      password: !isPasswordValid(password.value),
      confirmPassword:
        password.value !== passwordRepeat.value ||
        !isPasswordValid(passwordRepeat.value),
      github: !isGithub(github.value),
      cv: cv[0]?.originFileObj.length < 1,
    });
  };

  const register = async () => {
    setLoading(true);
    setError(false);
    await valid();

    Object.values(errorValid).forEach((e) => {
      if (e) {
        console.log(e);
        setError(true);
      }
    });

    if (!error) {
      await AuthService.registration(
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
          message.error("this email is already taken");
        });
    } else {
      message.error("incorrect data");
    }

    setLoading(false);
  };

  return (
    <Layout col={1} title="Register">
      <div className={styles.wrapper}>
        <Form
          className={styles.container}
          name="login"
          id="login"
          initialValues={{ remember: true }}
          autoComplete="off"
          role="form"
        >
          <Logo />
          <Input
            status={errorValid.name ? "error" : ""}
            placeholder="name 4-32"
            className={styles.item}
            {...name}
          />
          <Input
            placeholder="surname 4-32"
            className={styles.item}
            {...surname}
            status={errorValid.surname ? "error" : ""}
          />
          <MaskedInput
            className={styles.item}
            {...number}
            status={errorValid.phone ? "error" : ""}
            mask={"+00(00)0000-0000"}
            maskOptions={{
              dispatch: function (appended, dynamicMasked) {
                const isCellPhone = dynamicMasked.unmaskedValue[2] === "9";
                return dynamicMasked.compiledMasks[isCellPhone ? 0 : 1];
              },
            }}
          />
          <Input
            placeholder="email"
            className={styles.item}
            status={errorValid.email ? "error" : ""}
            {...email}
          />
          <Input.Password
            status={errorValid.password ? "error" : ""}
            placeholder="password 8-32"
            className={styles.item}
            maxLength={32}
            minLength={8}
            {...password}
          />
          <Input.Password
            status={errorValid.confirmPassword ? "error" : ""}
            placeholder="confirm password"
            className={styles.item}
            maxLength={32}
            minLength={8}
            {...passwordRepeat}
          />
          <Input
            status={errorValid.github ? "error" : ""}
            placeholder="github link"
            className={styles.item}
            {...github}
          />
          <FileUploader maxCount={1} setFile={setCv} />
          <br />
          <Button
            type="primary"
            className={styles.item}
            onClick={register}
            disabled={loading}
            loading={loading}
          >
            Register
          </Button>
          <Link href="/auth/login">
            <Button type="link" className={styles.item} size="small">
              or login
            </Button>
          </Link>
        </Form>
      </div>
    </Layout>
  );
};

export default Register;
