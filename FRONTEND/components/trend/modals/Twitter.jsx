import { Form, Select } from "antd";
import React from "react";
import { GEO_TWiTTER } from "../../../utils/consts";

const TwitterModal = ({ setGeoTwitter }) => {
  return (
    <>
      <Form.Item
        label="Geo "
        name="Geo_Twitter"
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
          onChange={(e) => setGeoTwitter(e)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
              0 ||
            option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {GEO_TWiTTER.map((i) => (
            <Select.Option key={i.code}>{i.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default TwitterModal;
