import React from "react";
import styles from "./Trend.module.css";
import { useRecoilState } from "recoil";
import { requestsState } from "../../store/atoms/trend/requestsState";
import { user } from "../../store/atoms/auth/user";
import { tableStatus } from "../../store/atoms/trend/tableStatus";
import { UserService } from "../../api/services/auth/UserService";
import BigCard from "./cards/BigCard";
import SmallCard from "./cards/SmallCard";
import * as uuid from "uuid";
import { Popconfirm } from "antd";
import {
  RedditOutlined,
  DeleteOutlined,
  GoogleOutlined,
  TwitterOutlined,
  CaretUpOutlined,
  YoutubeOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import {
  DeleteReq,
  getCountry,
  getCategory,
  getCountryTwitter,
  getCategoryNews,
} from "./service";
import RssIco from "../utils/icons/rssIco";

const Column = ({ column }) => {
  const [status, setStatus] = useRecoilState(tableStatus);
  const [requests, setRequests] = useRecoilState(requestsState);
  const [userData, setUserData] = useRecoilState(user);

  const confirmDelete = () => {
    setStatus({ ...status, delete: [...status.delete] });
    setRequests(DeleteReq(requests, column));
    UserService.setRequestsUser(userData, DeleteReq(requests, column));
  };

  const getColumnTitle = (type) => {
    switch (type) {
    case "reddit":
      return (
        <>
          <RedditOutlined />
          {` ${column.title}`}
        </>
      );
    case "google":
      return (
        <>
          <GoogleOutlined />
          {` ${getCategory(column.title)} - ${getCountry(column.geo)}`}
        </>
      );
    case "twitter":
      return (
        <>
          <TwitterOutlined />
          {` ${getCountryTwitter(column.geo)}`}
        </>
      );
    case "youtube":
      return (
        <>
          <YoutubeOutlined />
          {` ${getCountry(column.geo)}`}
        </>
      );
    case "news":
      return (
        <>
          <NotificationOutlined />
          {` ${getCategoryNews(column.title)} - ${getCountry(column.geo)}`}
        </>
      );
    case "rss":
      return (
        <>
          <RssIco />
          {` ${column.geo}`}
        </>
      );
    }
  };

  const getColumnData = (type, e) => {
    switch (type) {
    case "reddit":
      return (
        <SmallCard
          key={uuid.v4()}
          url={e.data.url}
          title={e.data.title}
          extra={
            <>
              <CaretUpOutlined />
              {e.data.ups}
            </>
          }
        />
      );
    case "google":
      return (
        <BigCard
          key={uuid.v4()}
          ups={false}
          url={e.shareUrl}
          title={e.title.replace(/,/g, ' •')}
          extra={""}
          description={
            <>{e.articles[0].articleTitle.replace(/&#39/g, '')}<p className={styles.pubData}>{e.image.source}</p></>
          }
        />
      );
    case "twitter":
      return (
        <SmallCard
          key={uuid.v4()}
          url={e.url}
          title={e.name}
          extra={
            e.tweet_volume !== null ? (
              <>
                <CaretUpOutlined /> {e.tweet_volume}
              </>
            ) : (
              <>
                <CaretUpOutlined /> -
              </>
            )
          }
        />
      );
    case "youtube":
      return (
        <SmallCard
          key={uuid.v4()}
          url={"https://www.youtube.com/watch?v=" + e.id}
          title={e.snippet.title}
          extra={""}
        />
      );
    case "news":
      return (
        <BigCard
          key={uuid.v4()}
          ups={false}
          url={e.url}
          title={e.title}
          extra={""}
          description={e.description}
        />
      );
    case "rss":
      return (
        <BigCard
          key={uuid.v4()}
          ups={false}
          url={e.link}
          title={e.title}
          extra={""}
          description={<><p>{e.contentSnippet}</p><p className={styles.pubData}>{e.pubDate.substr(0,10)}</p></>}
        />
      );
    }
  };

  return (
    <div className={styles.columnWrapper}>
      <div className={styles.columnHeader}>
        <h2>{getColumnTitle(column.type)}</h2>
        <Popconfirm
          title="Are you sure to delete this column?"
          onConfirm={() => confirmDelete()}
          okText="Yes"
          cancelText="No"
        >
          <h2 className="pointer">
            <DeleteOutlined />
          </h2>
        </Popconfirm>
      </div>
      {column.data.map((e) => getColumnData(column.type, e))}
    </div>
  );
};

export default Column;
