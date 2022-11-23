import React, { useState } from "react";
import styles from "./Trend.module.css";
import { Button, Modal, Form, notification, Radio } from "antd";
import { useRecoilState } from "recoil";
import { tableStatus } from "../../store/atoms/trend/tableStatus";
import { globalLoading } from "../../store/atoms/trend/loading";
import { requestsState } from "../../store/atoms/trend/requestsState";
import { user } from "../../store/atoms/auth/user";
import { UseInput } from "../../hooks/useInput";
import SmallAnimatedLogo from "../utils/AnimatedLogo/SmallAnimatedLogo";
import RedditModal from "./modals/Reddit";
import GoogleModal from "./modals/Google";
import TwitterModal from "./modals/Twitter";
import YoutubeModal from "./modals/Youtube";
import NewsModal from "./modals/News";
import { isUniqueRequest } from "./service";
import { GetReddit } from "../../api/services/reddit";
import { GetGoogle } from "../../api/services/google";
import { GetTwitter } from "../../api/services/twitter";
import { GetYoutube } from "../../api/services/youtube";
import { UserService } from "../../api/services/auth/UserService";
import { GetNews } from "../../api/services/news";
import { GetRss } from "../../api/services/rss";
import RssModal from "./modals/Rss";

const ControlButtons = () => {
  const [requests, setRequests] = useRecoilState(requestsState);
  const [loading, setLoading] = useRecoilState(globalLoading);
  const [statusTable, setStatusTable] = useRecoilState(tableStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reqType, setReqType] = useState("reddit");
  const [geo, setGeo] = useState("");
  const [geoTwitter, setGeoTwitter] = useState("");
  const [geoYoutube, setGeoYoutube] = useState("");
  const [category, setCategory] = useState("");
  const [geoNews, setGeoNews] = useState("");
  const [categoryNews, setCategoryNews] = useState("");
  const requestText = UseInput("");
  const rssUrl = UseInput("");
  const rssName = UseInput("");
  const typesOptions = [
    "reddit",
    "twitter",
    "google",
    "youtube",
    "news",
    "rss",
  ];
  const [userData, setUserData] = useRecoilState(user);

  const handleUpdate = () => {
    setStatusTable({ ...statusTable, update: [...statusTable.update] });
  };

  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onReqError = () => {
    openNotification(
      "error",
      "Incorrect value",
      "Please enter the correct request"
    );
  };

  const onReqSuccess = async () => {
    handleUpdate();
    openNotification(
      "success",
      "New data added successfully",
      "New list added below"
    );
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setLoading(true);
    if (
      isUniqueRequest(requests, {
        reqType,
        requestText,
        category,
        geo,
        geoTwitter,
        geoYoutube,
        categoryNews,
        geoNews,
        rssUrl,
        rssName,
      })
    ) {
      if (reqType === "reddit") {
        GetReddit(String(requestText.value))
          .then((res) => {
            if (res.data.data.children !== []) {
              setRequests((oldRequests) => [
                ...oldRequests,
                {
                  type: reqType,
                  data: requestText.value.toLowerCase(),
                  geo: "all",
                },
              ]);
              UserService.setRequestsUser(userData, [
                ...requests,
                {
                  type: reqType,
                  data: requestText.value.toLowerCase(),
                  geo: "all",
                },
              ]);
            } else {
              onReqError();
            }
          })
          .then(() => onReqSuccess())
          .catch(() => onReqError());
      }
      if (reqType === "google") {
        GetGoogle(geo, category)
          .then((res) => {
            if (res.data.storySummaries.trendingStories !== []) {
              setRequests((oldRequests) => [
                ...oldRequests,
                {
                  type: reqType,
                  geo: geo,
                  data: category,
                },
              ]);
              UserService.setRequestsUser(userData, [
                ...requests,
                {
                  type: reqType,
                  geo: geo,
                  data: category,
                },
              ]);
            } else {
              onReqError();
            }
          })
          .then(() => onReqSuccess())
          .catch(() => onReqError());
      }
      if (reqType === "twitter") {
        GetTwitter(geoTwitter)
          .then((res) => {
            if (res.data !== []) {
              setRequests((oldRequests) => [
                ...oldRequests,
                {
                  type: reqType,
                  geo: geoTwitter,
                  data: geoTwitter,
                },
              ]);
              UserService.setRequestsUser(userData, [
                ...requests,
                {
                  type: reqType,
                  geo: geoTwitter,
                  data: geoTwitter,
                },
              ]);
            } else {
              onReqError();
            }
          })
          .then(() => onReqSuccess())
          .catch(() => onReqError());
      }
      if (reqType === "youtube") {
        GetYoutube(geoYoutube)
          .then((res) => {
            if (res.data !== []) {
              setRequests((oldRequests) => [
                ...oldRequests,
                {
                  type: reqType,
                  geo: geoYoutube,
                  data: geoYoutube,
                },
              ]);
              UserService.setRequestsUser(userData, [
                ...requests,
                {
                  type: reqType,
                  geo: geoYoutube,
                  data: geoYoutube,
                },
              ]);
            } else {
              onReqError();
            }
          })
          .then(() => onReqSuccess())
          .catch(() => onReqError());
      }
      if (reqType === "news") {
        GetNews(geoNews, categoryNews)
          .then((res) => {
            if (res.data !== []) {
              setRequests((oldRequests) => [
                ...oldRequests,
                {
                  type: reqType,
                  geo: geoNews,
                  data: categoryNews,
                },
              ]);
              UserService.setRequestsUser(userData, [
                ...requests,
                {
                  type: reqType,
                  geo: geoNews,
                  data: categoryNews,
                },
              ]);
            } else {
              onReqError();
            }
          })
          .then(() => onReqSuccess())
          .catch(() => onReqError());
      }
      if (reqType === "rss") {
        GetRss(rssUrl.value)
          .then((res) => {
            if (res.data !== []) {
              setRequests((oldRequests) => [
                ...oldRequests,
                {
                  type: reqType,
                  geo: rssName.value,
                  data: rssUrl.value,
                },
              ]);
              UserService.setRequestsUser(userData, [
                ...requests,
                {
                  type: reqType,
                  geo: rssName.value,
                  data: rssUrl.value,
                },
              ]);
            } else {
              onReqError();
            }
          })
          .then(() => onReqSuccess())
          .catch(() => onReqError());
      }
    } else {
      openNotification(
        "warning",
        "Already exists",
        "This subreddit is already used in your data"
      );
    }

    setLoading(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getDisabled = (type) => {
    switch (type) {
    case "reddit":
      return requestText.value === "";
    case "google":
      return geo === "" || category === "";
    case "twitter":
      return geoTwitter === "";
    case "youtube":
      return geoYoutube === "";
    case "news":
      return geoNews === "" || categoryNews === "";
    case "rss":
      return rssUrl.value === "" || rssName.value === "";
    }
  };

  const getModal = (type) => {
    switch (type) {
    case "reddit":
      return <RedditModal requestText={requestText} />;
    case "google":
      return <GoogleModal setGeo={setGeo} setCategory={setCategory} />;
    case "twitter":
      return <TwitterModal setGeoTwitter={setGeoTwitter} />;
    case "youtube":
      return <YoutubeModal setGeo={setGeoYoutube} />;
    case "news":
      return <NewsModal setGeo={setGeoNews} setCategory={setCategoryNews} />;
    case "rss":
      return <RssModal rssUrl={rssUrl} rssName={rssName}/>;
    }
  };

  return (
    <div className={styles.buttonsBox}>
      {loading ? <SmallAnimatedLogo /> : <></>}
      <Button
        type="primary"
        size={"large"}
        disabled={loading || !(requests.length > 0)}
        onClick={() => handleUpdate()}
      >
        Update
      </Button>
      <Button
        size={"large"}
        type="primary"
        onClick={showModal}
        disabled={loading}
      >
        Add New
      </Button>
      <Modal
        title="Add New"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            loading={loading}
            disabled={getDisabled(reqType)}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          name="addNew"
          onFinish={handleOk}
          autoComplete="off"
          layout="vertical"
        >
          <div className={styles.radioGroup}>
            <Radio.Group
              options={typesOptions}
              onChange={(e) => {
                setReqType(e.target.value);
              }}
              value={reqType}
              optionType="button"
              buttonStyle="solid"
              size="large"
            />
          </div>
          {getModal(reqType)}
        </Form>
      </Modal>
    </div>
  );
};

export default ControlButtons;
