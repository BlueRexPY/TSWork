import { Form, Select } from "antd";
import React from "react";
import { CATEGORY_NEWS, GEO } from "../../../utils/consts";

const NewsModal = ({ setGeo, setCategory }) => {
  return (
    <>
      <Form.Item
        label="Geo"
        name="GeoNews"
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
      <Form.Item
        label="Category"
        name="CategoryNews"
        rules={[
          {
            required: true,
            message: "Please input Category!",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="choose a category"
          onChange={(e) => setCategory(e)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
              0 ||
            option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {CATEGORY_NEWS.map((i) => (
            <Select.Option key={i.code}>{i.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default NewsModal;
