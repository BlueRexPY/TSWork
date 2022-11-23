import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AnimatedLogo from "../utils/AnimatedLogo";
import { auth } from "../../store/atoms/auth/auth";
import { user } from "../../store/atoms/auth/user";
import { useRecoilState } from "recoil";
import { requestsState } from "../../store/atoms/trend/requestsState";
import Cookies from "js-cookie";
import AuthService from "../../api/services/auth/AuthService";
import { useRouter } from "next/router";

const GuardLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useRecoilState(auth);
  const [requests, setRequests] = useRecoilState(requestsState);
  const [userData, setUserData] = useRecoilState(user);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (Cookies.get("token") && !authUser) {
      AuthService.refresh()
        .then((res) => {
          if (res) {
            setAuthUser(true);
            setUserData(res.data.user.login);
            setRequests(res.data.user.requests);
            setLoading(false);
          } else {
            router.push("/auth/login");
          }
        })
        .catch((e) => {
          console.log("error " + e);
          Cookies.remove("token");
          router.push("/auth/login");
        });
    } else {
      if (!authUser) {
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
    }
  }, []);
  return <>{loading ? <AnimatedLogo /> : <>{children}</>}</>;
};

GuardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GuardLayout;
