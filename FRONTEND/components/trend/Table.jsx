import React, { useEffect, useState } from "react";
import { globalLoading } from "../../store/atoms/trend/loading";
import { requestsState } from "../../store/atoms/trend/requestsState";
import styles from "./Trend.module.css";
import { useRecoilState } from "recoil";
import { fetchData, filterPostsData } from "./service";
import Column from "./Column";
import { Empty } from "antd";
import * as uuid from "uuid";
import { tableStatus } from "../../store/atoms/trend/tableStatus";


const Table = () => {
  const [requests, setRequests] = useRecoilState(requestsState);
  const [status, setStatus] = useRecoilState(tableStatus);
  const [loading, setLoading] = useRecoilState(globalLoading);
  const [postsData, setPostsData] = useState([]);

  const fetchDataArray = async (requests) => {
    setLoading(true);
    const newArr = [];
    await Promise.all(
      requests.map(async(e) => {
        const res = await fetchData(e);
        newArr.push(res);
      })
    );
    
    console.info(newArr);
    setPostsData(newArr);
    setLoading(false);
  };
  

  useEffect(() => {
    fetchDataArray(requests);
  }, [status.update]);

  useEffect(() => {
    filterPostsData(requests, postsData).then((res) => setPostsData(res));
  }, [status.delete]);

  return (
    <div className={styles.columnsWrapper}>
      {postsData.length > 0 ? (
        postsData.map((e) => <Column key={uuid.v4()} column={e} />)
      ) : (
        <div className="center">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ color: "#888" }}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
