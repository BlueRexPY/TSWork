import { UploadProps } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import React from "react";

type Props = {
  maxCount?: number;
  setFile: Function;
  acceptFile?: string;
};

const fileUploaderPhoto: React.FC<Props> = (props: Props) => {
  const { maxCount = 1, acceptFile = "image/*" } = props;
  const handleChange: UploadProps["onChange"] = ({ fileList: newFile }) =>
    props.setFile(newFile);

  return (
    <Dragger
      maxCount={maxCount}
      accept={acceptFile}
      onChange={handleChange}
      className={`fileUploaderPhoto`}
    >
      <div>
        <p>Click or drag logo</p>
      </div>
    </Dragger>
  );
};

export default fileUploaderPhoto;
