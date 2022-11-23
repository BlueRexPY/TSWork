import { Form, Input } from "antd";
import React from "react";

const RedditModal = ({ requestText }) => {
  return (
    <Form.Item
      label="Request"
      name="request"
      rules={[
        {
          required: true,
          message: "Please input request!",
        },
      ]}
    >
      <Input ref={(input) => input && input.focus()} {...requestText} />
    </Form.Item>
  );
};

export default RedditModal;
