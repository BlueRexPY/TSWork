import React from "react";
import { Skeleton } from "antd";

const SkeltonItem: React.FC = () => {
  return (
    <div className="SkeltonItem" role="skeleton">
      <Skeleton active avatar paragraph={{ rows: 1 }} />
    </div>
  );
};

export default SkeltonItem;
