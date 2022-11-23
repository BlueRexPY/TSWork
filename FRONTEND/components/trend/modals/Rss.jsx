import { Form, Input } from "antd";
import React from "react";

const RssModal = ({ rssUrl,rssName }) => {
  return (
    <>
      <Form.Item
        label="Name"
        name="rssName"
        rules={[
          {
            required: true,
            message: "Please input request!",
          },
        ]}
      >
        <Input {...rssName} placeholder="trends" />
      </Form.Item>
      <Form.Item
        label="RSS URL"
        name="rssUrl"
        rules={[
          {
            required: true,
            message: "Please input request!",
          },
        ]}
      >
        <Input {...rssUrl} placeholder="https://trends.actable.ai/" />
      </Form.Item>
    </>
  );
};

export default RssModal;
