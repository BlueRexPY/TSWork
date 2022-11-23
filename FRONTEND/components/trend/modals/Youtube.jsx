import { Form, Select } from "antd";
import React from "react";
import { GEO } from "../../../utils/consts";

const YoutubeModal = ({ setGeo }) => {
  return (
    <>
      <Form.Item
        label="Gео  "
        name="Gео  "
        rules={[
          {
            required: true,
            message: "Please input location!",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="choose a location"
          onChange={(e) => setGeo(e)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
              0 ||
            option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {GEO.map((i) => (
            <Select.Option key={i.code}>{i.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default YoutubeModal;
